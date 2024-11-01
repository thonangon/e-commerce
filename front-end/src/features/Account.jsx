import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_URL } from '../config/index';
import axios from 'axios';

const { width } = Dimensions.get('window');

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, password, token } = route.params || {}; 
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Email verification function
  const verifyEmail = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/email-verify/${token}`);
      setSuccessMessage(response.data.url || 'Email verified successfully.');
      console.log(response.data.url)
    } catch (error) {
      setError(error.response?.data?.message || 'Email verification failed.');
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyProfile = () => {
    if (!firstName.trim() || !lastName.trim() || !dob.trim() || !phone.trim() || !gender) {
      setError('Please fill in all required fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Invalid phone number format.');
      return false;
    }

    setError(''); 
    return true;
  };

  const postProfile = async () => {
    if (!verifyProfile()) return; 

    try {
      await axios.post(`${API_URL}/auth/profile`, {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        dob,
        phone,
        gender,
      });
      setError(''); 
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update account data.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <Icon name="chevron-left" size={20} color="#000" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>MY ACCOUNT</Text>
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.firstName]}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, styles.lastName]}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={dob}
        onChangeText={setDob}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        editable={false} 
      />

      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.editButton} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <View style={styles.genderContainer}>
        <TouchableOpacity onPress={() => setGender('male')} style={styles.radioButton}>
          <Icon
            name={gender === 'male' ? 'dot-circle-o' : 'circle-o'}
            size={20}
            color="#000"
          />
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setGender('female')} style={styles.radioButton}>
          <Icon
            name={gender === 'female' ? 'dot-circle-o' : 'circle-o'}
            size={20}
            color="#000"
          />
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setGender('prefer')} style={styles.radioButton}>
          <Icon
            name={gender === 'prefer' ? 'dot-circle-o' : 'circle-o'}
            size={20}
            color="#000"
          />
          <Text style={styles.radioText}>Prefer not to say</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={postProfile}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
      {successMessage ? <Text style={{ color: 'green' }}>{successMessage}</Text> : null}
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    left: -90,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  firstName: {
    width: '48%',
  },
  lastName: {
    width: '48%',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  editButton: {
    padding: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#00D1C1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyAccountScreen;
