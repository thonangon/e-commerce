import React, { useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { API_URL } from '../../config/index';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
const PaymentForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {grandTotal} = route.params;

  const submitPayment = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }
  
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API_URL}/pay_order/make-payment`, {
        email,
        amount: grandTotal, 
      });
  
      const clientSecret = data.client_secret;
      if (!clientSecret) {
        throw new Error('Failed to retrieve client secret from server.');
      }
      // Initialize PaymentSheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initError) {
        console.error(initError.message);
        Alert.alert('Error', 'Failed to initialize payment sheet.');
        return;
      }

      

      setShowModal(true); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header} >Payment Method</Text>
      <Text style={styles.subheader}>Enjoy your shopping  and get new product in everyday</Text>
      <Text style={styles.amount}>${grandTotal || '0.00'}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Total Amount"
          keyboardType="numeric"
          value={grandTotal}
          onChangeText={setAmount}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          style={styles.cardContainer}
        />
        <TouchableOpacity
          style={[styles.button, submitting && styles.buttonDisabled]}
          onPress={submitPayment}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Pay</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalHeader}>Payment Successful!</Text>
            <Text>Your payment was processed successfully.</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('HOMEPAGE');
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa', 
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#212529', 
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c757d', // Muted text
    marginBottom: 20,
    lineHeight: 22,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00C2C2', 
  },
  form: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#fff', // White card-style background
    shadowColor: '#000',
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1,
    elevation: 0.7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    color: '#495057',
  },
  cardContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  button: {
    backgroundColor: '#00C2C2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#007bff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#adb5bd', // Muted gray for disabled button
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#28a745', // Green for success
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default PaymentForm;
