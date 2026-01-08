import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const Abd = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.t1}>Disease & Pest Detection</Text>

      
      {image && <Image source={{ uri: image }} style={styles.preview} />}

      
      <View style={styles.dottedBox}>
        <TouchableOpacity
          style={styles.innerButton}
          onPress={() => navigation.navigate('Ui')}
        >
          <MaterialIcons name="photo-camera" size={40} color="#0a5c2f" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.btnText}>Take Photo</Text>
            <Text style={styles.subText}>Click to open camera</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Upload Box */}
      <View style={styles.dottedBox}>
        <TouchableOpacity
          style={styles.innerButton}
          onPress={pickFromGallery}
        >
          <MaterialIcons name="photo-library" size={40} color="#0a5c2f" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.btnText}>Upload Image</Text>
            <Text style={styles.subText}>Select from gallery</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Abd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eaf5eb', 
    paddingTop: 40,
  },
  t1: {
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 25,
    textAlign: 'center',
    color: '#0a5c2f',
    textShadowColor: '#a3d9a5',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  preview: {
    width: 220,
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#0a5c2f',
  },
  dottedBox: {
    width: 320,
    minHeight: 100,
    borderWidth: 2,
    borderColor: '#0a5c2f',
    borderStyle: 'dotted',
    borderRadius: 15,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, 
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  innerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a5c2f',
  },
  subText: {
    fontSize: 14,
    color: '#4a9b6d',
    marginTop: 3,
  },
});
