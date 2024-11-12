import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerSuccess, registerError, loginSuccess, loginError } from '../store/useSlice';
import { API_URL } from '../config/index';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAuth = async () => {
    if (isRegister) {
      await userRegistration();
    } else {
      await userLogin();
    }
  };

  const userRegistration = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/`, {
        email,
        password,
      });

      console.log("Registration Response:", response.data);

      if (response.status === 201) {
        const { token, url: verificationUrl } = response.data.user;

        console.log("Token received:", token);
        console.log("Verification URL:", verificationUrl);

        const verificationResponse = await axios.get(verificationUrl);

        if (verificationResponse.status === 200) {
          const userData = { accountUser: { email }, tokenUser: token };
          dispatch(registerSuccess(userData));
          navigation.navigate('ACCOUNT', { email, password });
        } else {
          throw new Error('Verification failed.');
        }
      }
    } catch (error) {
      console.error("Error in userRegistration:", error);
      const errorMessage = error.response?.data?.message || 'Registration or verification failed.';
      setError(errorMessage);
      dispatch(registerError(errorMessage));
    }
  };

  const userLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, is_admin } = response.data; 
        dispatch(loginSuccess({ user: { email }, token, is_admin }));
        if (is_admin) {
          navigation.navigate('HOMEPAGE'); 
        } else {
          navigation.navigate('ACCOUNT'); 
        }
      }
    } catch (error) {
      console.error("Error in userLogin:", error);
      const errorMessage = error.response?.data?.message || 'Login failed.';
      setError(errorMessage);
      dispatch(loginError(errorMessage));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>GO FOR IT</Text>
      </View>
      <Text style={styles.subtitle}>
        {isRegister ? "Create a new account" : "Let's check if you have an account..."}
      </Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="@gmail.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="*************"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.shopNowButton} onPress={handleAuth}>
        <Text style={styles.shopNowText}>{isRegister ? "REGISTER" : "LOGIN"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.toggleText}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 30,
  },
  headerTop: {
    left: -8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    left: -100,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    fontSize: 16,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  shopNowButton: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C2C2',
    marginHorizontal: 20,
    marginTop: 20,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleText: {
    color: '#00C2C2',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
