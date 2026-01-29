// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native'
// import React, { useState } from 'react'

// const Login = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//   const handleLogin =  () => {
//   if (!email || !password) {
//     Alert.alert('Error', 'Please enter both email and password');
//     return;
//   }
//   navigation.navigate('Home');
// }

//   return (
//     <ImageBackground source={require('../../assets/sindh.jpg')} style={styles.background} resizeMode='cover'>
//     <View style={styles.container}>
//         <View style={styles.inputBox}>
//         <TextInput style={styles.textInput} placeholder='Username' placeholderTextColor="white" value={email} onChangeText={setEmail}>

//         </TextInput>
//         </View>
//       <View style={styles.inputBox}>
//       <TextInput style={styles.textInput} placeholder='Password' placeholderTextColor="white" secureTextEntry={true} value={password} onChangeText={setPassword}>
//         </TextInput>
//       </View>
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//             <Text style={styles.login}>Login</Text>
//         </TouchableOpacity>
//     </View>
//     </ImageBackground>
//   )
// }

// export default Login

// const styles = StyleSheet.create({
//   login:{
//     color:'white',
//     fontWeight:'bold'
//   },
//   background: {
//     flex: 1,           
//     width: '100%',
//     height: '100%',
//   },

//   container: {
//     flex: 1,         
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   inputBox: {
//     width: 280,
//     height: 45,
//     borderRadius: 23,
//     backgroundColor: '#08460dff',
//     justifyContent: 'center',
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     elevation: 4,
//   },

//   textInput: {
//     fontSize: 14,
//     color: '#000',
//   },

//   button: {
//     width: 330,
//     height: 48,
//     borderRadius: 28,
//     backgroundColor: '#08460dff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },

//   btnText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//   },
// })
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function LoginScreen() {
  const handleLogin = () => {
    router.push("/tabs/Home")
  };



  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
    
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue to AgriTech</Text>
          </View>
          
          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email or Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email or username"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>
            
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Create New Account</Text>
            </TouchableOpacity>
          </View>
          
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 14,
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },
});