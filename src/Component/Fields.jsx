

import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Modal, TextInput, ScrollView, Alert, Image } from 'react-native';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import finance from '../../assets/lottie/finance.json';
export default function CostTracker({ navigation }) {
  const [records, setRecords] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', field: '', description: '' });
  const [activeType, setActiveType] = useState("credit");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);



  const fields = [...new Set(records.map(r => r.field))];

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?", // Alert message
      [
        {
          text: "Cancel", // Cancel button
          style: "cancel"
        },
        {
          text: "OK", // OK button
          onPress: () => {
            setRecords(records.filter(record => record.id !== id)); // Delete record
          }
        }
      ],
      { cancelable: false } // Prevent dismiss by tapping outside
    );
  };
  const handleEdit = (item) => {

    setFormData({
      name: item.name,
      field: item.field,
      description: item.description
    });

    setEditId(item.id);
    setIsEditing(true);

    setModalVisible(true);
  };




  const handleSubmit = () => {

    if (!formData.name || !formData.field || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {

      const updatedRecords = records.map(item =>
        item.id === editId
          ? { ...item, ...formData }
          : item
      );

      setRecords(updatedRecords);

      setIsEditing(false);
      setEditId(null);

    } else {

      const newRecord = {
        id: records.length + 1,
        field: formData.field,
        name: formData.name,
        description: formData.description,
        date: new Date().toLocaleDateString(),
      };

      setRecords([newRecord, ...records]);
    }

    setFormData({ name: '', field: '', description: '' });
    setModalVisible(false);
  };


  return (

    <View style={styles.container}>
      <Text style={styles.title}> Farmers Records</Text>

      <View style={styles.banner}>
        <Image source={require('../../assets/wallet.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.bannerText}>Save your money with Expense Tracker</Text>
      </View>
      <StatusBar barStyle="dark-content" />

      {/* Records List */}
      <ScrollView style={{ flex: 1, marginBottom: 80 }}>
        {records.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('CostTracker', { fields: item.field })}
          >
            <View style={styles.personCard}>


              <View style={styles.textColumn}>
                <Text style={styles.personName}>{item.name}</Text>
                <Text style={styles.personField}>{item.field}</Text>
                <Text style={styles.personDescription}>{item.description}</Text>
                <Text style={styles.dateText}>Date: {item.date}</Text>
              </View>


              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.deleteButton, { backgroundColor: '#3B82F6', marginRight: 8 }]}
                  onPress={() => handleEdit(item)}
                >
                  <Entypo name="edit" size={18} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <AntDesign name="delete" size={18} color="white" />
                </TouchableOpacity>
              </View>

            </View>
          </TouchableOpacity>

        ))}
      </ScrollView>

      {/* Add Record Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={40} color="white" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView
          contentContainerStyle={{}}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ padding: 20 }}>

            <LottieView source={finance} style={{ width: 300, height: 300, alignItems: 'center' }} autoPlay />
            <TextInput
              placeholder="Enter Name"
              style={styles.textInput}
              value={formData.name}
              onChangeText={text => setFormData({ ...formData, name: text })}
            />
            <TextInput
              placeholder="Enter Field"
              style={styles.textInput}
              value={formData.field}
              onChangeText={text => setFormData({ ...formData, field: text })}
            />
            <TextInput
              placeholder="Enter Description"
              style={styles.textArea}
              multiline
              value={formData.description}
              onChangeText={text => setFormData({ ...formData, description: text })}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>
                  {isEditing ? "Update" : "Save"}

                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={() => {
                setModalVisible(false);
                setIsEditing(false);
                setEditId(null);
                setFormData({ name: '', field: '', description: '' });
              }}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },



  image: {
    width: 130,
    height: 130,
    borderRadius: 22,
    resizeMode: 'cover',
  },



  banner: {
    width: 260,
    height: 260,
    backgroundColor: '#ECFDF5',
    borderRadius: 130,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 24,

    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 14,
  },

  bannerText: {
    color: '#14532D',
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
    width: '70%',
    lineHeight: 26,
    letterSpacing: 0.4,
  },


  deleteButton: {
    backgroundColor: '#f61010',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 14,

    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  dateText: {
    fontSize: 12,
    color: '#64748B',
    letterSpacing: 0.3,
  },


  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 18,
  },



  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#14532D',
    marginVertical: 18,
    letterSpacing: 0.8,
  },


  fieldHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: '#166534',
    marginTop: 18,
    marginBottom: 10,
  },



  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,

  },

  textColumn: {
    flex: 1,
    paddingLeft: 14,
  },

  personName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#14532D',
  },

  personField: {
    fontSize: 14,
    color: '#22C55E',
    marginVertical: 3,
    fontWeight: '600',
  },

  personDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },



  addButton: {
    position: 'absolute',
    bottom: 28,
    right: 22,
    width: 62,
    height: 62,
    borderRadius: 32,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 15,
  },

  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: '#052E16',
    borderWidth: 1.2,
    borderColor: '#BBF7D0',
    marginBottom: 14,
  },

  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: '#052E16',
    borderWidth: 1.2,
    borderColor: '#BBF7D0',
    height: 130,
    textAlignVertical: 'top',
    marginBottom: 14,
  },


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },


  submitButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 16,
    borderRadius: 16,
    width: '48%',
    alignItems: 'center',

    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },

  submitText: {
    color: '#ECFDF5',
    fontWeight: '900',
    fontSize: 17,
    letterSpacing: 0.5,
  },



  closeButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 16,
    borderRadius: 16,
    width: '48%',
    alignItems: 'center',
  },

  closeText: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.4,
  },
});