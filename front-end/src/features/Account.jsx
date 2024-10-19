import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('window');

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

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
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.editButton}>
          {/* Icon can go here */}
        </TouchableOpacity>
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

      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate("CHANGEPASSWORD")}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
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
    // Add styling for the edit icon here
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
