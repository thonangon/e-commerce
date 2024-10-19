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

const LoginScreen = ({ navigation }) => { // Destructure navigation prop correctly
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>GO FOR IT</Text>
      </View>
      <Text style={styles.subtitle}>Let's check if you have an account...</Text>

      {/* Email input */}
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

      {/* Password input */}
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
          {/* Eye icon for showing/hiding password */}
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Register button */}
      <TouchableOpacity 
        style={styles.shopNowButton} 
        onPress={() => navigation.navigate("ACCOUNT")} // Ensure navigation works
      >
        <Text style={styles.shopNowText}>REGISTER</Text>
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
  headerTop:{
    left: -8,
    flexDirection: 'row',
    justifyContent:'space-between',
    
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
    position: 'absolute',
    top: '90%',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C2C2',
    marginHorizontal: 40,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
