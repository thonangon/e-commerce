
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <Text style={styles.title}>SIGN IN WITH</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.appleButton}>
        <LinearGradient
          colors={['#00C2C2', '#00C2C2']}
          style={styles.appleGradient}
        >
          <Icon name="apple" size={20} color="#fff" />
          <Text style={styles.appleText}>Sign in with Apple</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.separator} />
      </View>
      <TouchableOpacity style={styles.signInOption}>
        <Icon name="facebook" size={20} color="#3b5998" />
        <Text style={styles.signInText}>Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInOption}>
        <Icon name="google" size={20} color="#db4a39" />
        <Text style={styles.signInText}>Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInOption} onPress={() => navigation.navigate('CHECKIN')}>
        <Icon name="envelope" size={20} color="#000" />
        <Text style={styles.signInText}>Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    
  },
  headerTop:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  appleButton: {
    width: width * 0.9,
    alignSelf: 'center',
    
  },
  appleGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C2C2',
    paddingVertical: 15,
  },
  appleText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  separator: {
    width: '40%',
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#999',
  },
  signInOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: width * 0.9,
    alignSelf: 'center',
    marginBottom: 15,
  },
  signInText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
export default SignInScreen;
