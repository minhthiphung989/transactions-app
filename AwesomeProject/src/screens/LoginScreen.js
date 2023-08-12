import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      onLogin();
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.background}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Transaction App</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#B9B9B9"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#B9B9B9"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} color="#fff" />
          {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1E1E1',
  },
  background: {
    backgroundColor: '#ACA47C',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    shadowColor: '#ACA47C',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    color: '#000',
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  signupButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
