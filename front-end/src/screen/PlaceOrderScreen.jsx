import React, { useState, useEffect } from 'react';
import { VStack, HStack, Box, Text, Button, Divider, Image } from 'native-base';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../config/index';

const PlaceOrderScreen = () => {
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigation.goBack();
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/oder_detail/orderDetail/`);
        if (response.status === 200) {
          setOrderDetails(response.data);
        } else {
          console.error(`Failed to fetch order details, status: ${response.status}`);
          setError('Failed to fetch order details.');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('An error occurred while fetching order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Loading order details...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="red.500">{error}</Text>
        <Button onPress={handleBack} mt={4}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (!orderDetails) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>No order details available.</Text>
        <Button onPress={handleBack} mt={4}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <VStack space={4} p={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold">PLACE ORDER</Text>
          <Button variant="ghost" colorScheme="coolGray" size="sm">
            <Text onPress={handleBack} fontSize="lg">✕</Text>
          </Button>
        </HStack>
        <Divider my={2} />
        <VStack space={2} mt={4}>
          <Text fontSize="md" fontWeight="bold">ORDER SUMMARY</Text>
          {orderDetails.items.map((item, index) => (
            <HStack justifyContent="space-between" key={index}>
              <Text>{item.name} (Qty: {item.quantity})</Text>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
            </HStack>
          ))}
          <Divider my={2} />
          <HStack justifyContent="space-between">
            <Text fontSize="lg" fontWeight="bold">Total</Text>
            <Text fontSize="lg" fontWeight="bold">${orderDetails.total.toFixed(2)}</Text>
          </HStack>
        </VStack>
        <VStack mt={6} space={2}>
          <Text fontSize="md" fontWeight="bold">ACCEPTED PAYMENT METHODS</Text>
          <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" mt={10}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png' }} alt="Visa" size="lg" />
            <Image source={{ uri: 'https://seeklogo.com/images/M/mastercard-logo-3CC78C7480-seeklogo.com.png' }} alt="Mastercard" size="lg" />
          </HStack>
        </VStack>
        <HStack mt={150} justifyContent="space-between">
          <Button onPress={handleBack} flex={1} variant="outline" colorScheme="coolGray" size="lg" mr={2}>
            <Text>CANCEL</Text>
          </Button>
          <Button flex={1} bg="#00C2C2" size="lg" ml={2}>
            <Text>ORDER</Text>
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default PlaceOrderScreen;
