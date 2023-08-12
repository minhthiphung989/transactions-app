import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      const storedAddress = await AsyncStorage.getItem('address');

      if (storedName) setName(storedName);
      if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
      if (storedAddress) setAddress(storedAddress);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      await AsyncStorage.setItem('address', address);

      Alert.alert('Success', 'Profile data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Profile Screen</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray' }}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ marginBottom: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray' }}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={{ marginBottom: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray' }}
      />
      <TouchableOpacity
        onPress={saveData}
        style={{
          backgroundColor: '#3498db',
          paddingVertical: 10,
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserScreen