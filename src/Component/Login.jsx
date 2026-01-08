import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const handleLogin =  () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter both email and password');
    return;
  }
  navigation.navigate('Abd');
}

  return (
    <ImageBackground source={require('../../assets/sindh.jpg')} style={styles.background} resizeMode='cover'>
    <View style={styles.container}>
        <View style={styles.inputBox}>
        <TextInput style={styles.textInput} placeholder='Username' placeholderTextColor="white" value={email} onChangeText={setEmail}>

        </TextInput>
        </View>
      <View style={styles.inputBox}>
      <TextInput style={styles.textInput} placeholder='Password' placeholderTextColor="white" secureTextEntry={true} value={password} onChangeText={setPassword}>
        </TextInput>
      </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
  login:{
    color:'white',
    fontWeight:'bold'
  },
  background: {
    flex: 1,           
    width: '100%',
    height: '100%',
  },

  container: {
    flex: 1,         
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 280,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#08460dff',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 4,
  },

  textInput: {
    fontSize: 14,
    color: '#000',
  },

  button: {
    width: 330,
    height: 48,
    borderRadius: 28,
    backgroundColor: '#08460dff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
})
