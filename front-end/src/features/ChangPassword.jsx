import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>CHANGE PASSWORD</Text>
      </View>
      {/* Current Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={!currentPasswordVisible}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
        >
          <Icon
            name={currentPasswordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* New Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={!newPasswordVisible}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setNewPasswordVisible(!newPasswordVisible)}
        >
          <Icon
            name={newPasswordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: -5,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    left: 20,
  },
  headerTop:{
    marginBottom: 40,
    justifyContent:'space-between',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});

export default ChangePasswordScreen;
