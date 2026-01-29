import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView, Platform, Pressable, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

const CostTracker = ({ route }) => {

  const field = route?.params?.field || '';

  const [modalVisible, setModalVisible] = useState(false);
  const [modVisible, setModVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', field: '', description: '', cashIn: '', cashOut: '' });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [records, setRecords] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [displayType, setDisplayType] = useState(null);



  const getBalance = () => {
    if (selectedType === "credit") {
      return totalCredit;
    } else if (selectedType === "deposit") {
      return totalDeposit;
    }
    return 0;
  };

  const totalCredit = records.reduce((sum, item) => {
    return sum + Number(item.cashIn || 0);
  }, 0);

  const totalDeposit = records.reduce((sum, item) => {
    return sum + Number(item.cashOut || 0);
  }, 0);


  const filterData = records.filter(item => {
    if (activeType === 'credit') {
      return item.cashIn > 0;
    } else {
      return item.cashOut > 0;
    }
    return true;
  });


  const handleSubmit = () => {

    const newRecord = {
      id: Date.now(),
      name: formData.name,
      field: formData.field,
      description: formData.description,
      cashIn: formData.cashIn || 0,
      cashOut: formData.cashOut || 0,
      date: new Date().toDateString()
    };

    setRecords(prev => [...prev, newRecord]);

    resetForm();
    setModalVisible(false);
  };


  const resetForm = () => {
    setFormData({ name: '', field: '', description: '', cashIn: '', cashOut: '' });
  };
  // FILTER DATA BASED ON FIELD, TYPE, AND SELECTED DATE
  const filteredData = records.filter(item => {
    const matchField = field ? item.field.toLowerCase().includes(field.toLowerCase()) : true;

    // Correct date comparison
    let matchDay = true;
    if (selectedDay) {
      const itemDate = new Date(item.date); // convert string to Date
      matchDay = itemDate.getDate() === selectedDay;
    }

    // Match based on selected type (credit or deposit)
    const matchType = selectedType === 'credit' ? Number(item.cashIn) > 0 : Number(item.cashOut) > 0;

    return matchField && matchDay && matchType;
  });



  return (

    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.balanceCard}>

        <View style={styles.balanceRow}>
          <Pressable style={styles.balanceLabel} onPress={() => setDropdownOpen(!dropdownOpen)}>
            <Text style={styles.cardTitle}>
              {selectedType === "credit" ? "Total Credit" : "Total Deposit"}
            </Text>
            <Ionicons

              name={dropdownOpen ? "arrow-up-circle" : "arrow-down-circle"}
              size={26}
              color="#00060d"
              style={{ marginLeft: 5, marginBottom: 10 }}
            />
          </Pressable>
          <Text style={[
            styles.balanceValue,
            selectedType === "credit" ? { color: '#dbe7df' } : { color: '#FE0505' }
          ]}>
            Rs {getBalance()}
          </Text>
        </View>


        {dropdownOpen && (
          <View style={styles.dropdownOptions}>
            <Pressable
              style={styles.option}
              onPress={() => {
                setSelectedType("credit");
                setDropdownOpen(false);
              }}
            >
              <Text style={styles.optionText}>Credit</Text>
            </Pressable>
            <Pressable
              style={styles.option}
              onPress={() => {
                setSelectedType("deposit");
                setDropdownOpen(false);
              }}
            >
              <Text style={styles.optionText}>Deposit</Text>
            </Pressable>

          </View>

        )}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10 }}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Feather name="calendar" size={28} color="#000b01" />
          </TouchableOpacity>
          {selectedDay && (
            <TouchableOpacity onPress={() => setSelectedDay(null)} style={{ marginLeft: 10 }}>
              <Text style={{ color: '#000e01', fontWeight: 'bold' }}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>


      {/* ACTIVE TYPE LABEL */}
      {activeType && (
        <Text style={styles.activeTypeLabel}>
          {activeType === "credit" ? "Credit Records" : "Deposit Records"}
        </Text>
      )}



      {/* DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDay(date.getDate());
          }}
        />
      )}

      {/* LIST */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {filteredData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.personCard, { flexDirection: 'row' }]}
            onPress={() => { setSelectedItem(item); setModVisible(true); }}
          >
            <View style={{ flex: 1, }}>
              <Text style={styles.personName}>{item.field}</Text>
              <Text style={styles.personField}>{item.date}</Text>
              <Text style={styles.personDescription}>{item.description}</Text>
            </View>


            <View style={{ width: 90, alignItems: 'flex-end' }}>
              {selectedType === "deposit" && (
                <Text style={{ color: 'red', fontWeight: '700' }}>
                  {item.cashOut}
                </Text>
              )}

              {selectedType === "credit" && (
                <Text style={{ color: 'green', fontWeight: '700' }}>
                  {item.cashIn}
                </Text>
              )}
            </View>




          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={modVisible} animationType="slide">
        <View style={{ padding: 20, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <TouchableOpacity onPress={() => setModVisible(false)}>
              <Feather name="arrow-left" size={24} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>{selectedItem?.name}</Text>
          </View>
          <Text>Date: {selectedItem?.date}</Text>
          <Text>Field: {selectedItem?.field}</Text>
          <Text>Description: {selectedItem?.description}</Text>
        </View>
      </Modal>



      <View style={styles.content}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={40} color="black" />
        </TouchableOpacity>

        {/* ADD ITEM MODAL */}

        <Modal visible={modalVisible} animationType="slide">

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >

            <View style={{ flex: 1, top: 30 }}>

              <ScrollView
                contentContainerStyle={{ padding: 20 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >

                {/* FORM */}

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    placeholder="Enter Name"
                    style={styles.textInput}
                    value={formData.name}
                    onChangeText={(text) =>
                      setFormData({ ...formData, name: text })
                    }
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Field</Text>
                  <TextInput
                    placeholder="Enter Field"
                    style={styles.textInput}
                    value={formData.field}
                    onChangeText={(text) =>
                      setFormData({ ...formData, field: text })
                    }
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Cash In</Text>
                  <TextInput
                    placeholder="Enter Cash In Amount"
                    style={styles.textInput}
                    value={formData.cashIn}
                    onChangeText={(text) =>
                      setFormData({ ...formData, cashIn: text })
                    }
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Cash Out</Text>
                  <TextInput
                    placeholder="Enter Cash Out Amount"
                    style={styles.textInput}
                    value={formData.cashOut}
                    onChangeText={(text) =>
                      setFormData({ ...formData, cashOut: text })
                    }
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput
                    placeholder="Enter Description"
                    style={styles.textArea}
                    multiline
                    value={formData.description}
                    onChangeText={(text) => {
                      const words = text.trim().split(/\s+/);
                      if (words.length <= 10) {
                        setFormData({ ...formData, description: text });
                      }
                    }}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      resetForm();
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>

            </View>

          </KeyboardAvoidingView>

        </Modal>

      </View>
    </View>
  );
};

export default CostTracker;



const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // maxHeight: "100%",
  }
  ,



  /* 🌱 BALANCE ROW */
  balanceRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },

  balanceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  /* 🌾 MAIN SCREEN */
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    paddingTop: 45,
    paddingHorizontal: 18,
  },

  /* HEADER */
  header: {
    marginBottom: 22,
  },

  /* 💳 BALANCE CARD */
  balanceCard: {
    backgroundColor: '#16A34A',
    padding: 24,
    borderRadius: 22,

    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 14,

    width: '100%',
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#ECFDF5',
    marginBottom: 10,
    letterSpacing: 0.4,
  },

  /* 🔽 DROPDOWN */
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 16,
  },

  dropdownText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ECFDF5',
  },

  dropdownOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 10,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  optionText: {
    fontSize: 14,
    color: '#14532D',
    fontWeight: '600',
  },

  /* 💰 BALANCE VALUE */
  balanceValue: {
    fontSize: 32,
    fontWeight: '900',
    marginTop: 20,
    color: '#ECFDF5',
    letterSpacing: 0.8,
  },

  activeTypeLabel: {
    fontSize: 21,
    fontWeight: '900',
    color: '#14532D',
    marginBottom: 14,
  },

  /* 👨‍🌾 RECORD CARD */
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.96)',
    paddingHorizontal: 16,
    paddingVertical: 14,

    borderRadius: 20,

    marginHorizontal: 2,   // Safe side spacing
    marginBottom: 8,      // Controls gap between cards
    top: 20,
    alignSelf: 'stretch', // 👈 Instead of width:100%

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 6,
  },

  personName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#14532D',
  },

  personField: {
    fontSize: 14,
    color: '#22C55E',
    marginTop: 4,
    fontWeight: '700',
  },

  personDescription: {
    fontSize: 13,
    color: '#475569',
    marginTop: 4,
    lineHeight: 18,
  },

  /* ✍ FORM */
  inputGroup: {
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#166534',
    marginBottom: 6,
    marginLeft: 8,
  },

  textInput: {
    borderWidth: 1.2,
    borderColor: '#BBF7D0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    height: 54,
  },

  textArea: {
    borderWidth: 1.2,
    borderColor: '#BBF7D0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    height: 130,
    textAlignVertical: 'top',
  },

  /* 🔘 BUTTONS */
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },

  submitButton: {
    width: '48%',
    backgroundColor: '#16A34A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',

    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },

  submitText: {
    color: '#ECFDF5',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.4,
  },

  closeButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.8,
    borderColor: '#16A34A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  closeText: {
    color: '#16A34A',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.4,
  },

  /* ➕ FLOAT BUTTON */
  addButton: {
    position: 'absolute',
    bottom: 28,
    right: 22,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 15,
  },

});

