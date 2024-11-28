import React, { useState, useCallback, useEffect } from 'react';
import { VStack, HStack, Box, Text, Button, Divider, Image, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';

const PlaceOrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { items = [], totalItems = 0, totalPrice = 0 } = route.params || {};

  const shippingCost = 5.0;
  const tax = 0.1 * totalPrice;
  const grandTotal = totalPrice + shippingCost + tax;
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <VStack space={4} p={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold">PLACE ORDER</Text>
          <Button variant="ghost" colorScheme="coolGray" size="sm" onPress={() => navigation.goBack()}>
            <Text fontSize="lg">✕</Text>
          </Button>
        </HStack>
        <Divider my={2} />
        <VStack space={2} mt={4}>
          <Text fontSize="md" fontWeight="bold">ORDER SUMMARY</Text>
          <HStack justifyContent="space-between">
            <Text>{`${totalItems} items`}</Text>
            <Text>${totalPrice.toFixed(2)}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Subtotal</Text>
            <Text>${totalPrice.toFixed(2)}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Shipping</Text>
            <Text>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Tax</Text>
            <Text>${tax.toFixed(2)}</Text>
          </HStack>
          <Divider my={2} />
          <HStack justifyContent="space-between">
            <Text fontSize="lg" fontWeight="bold">Total</Text>
            <Text fontSize="lg" fontWeight="bold">${grandTotal.toFixed(2)}</Text>
          </HStack>
        </VStack>
        

        <VStack mt={6} >
            <Text fontSize="md" fontWeight="bold">ACCEPTED PAYMENT METHODS</Text>
            <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" mt={5}>
              <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png' }} alt="Amex" size="xs"  />
            </HStack>
          </VStack>
          <HStack mt={150} justifyContent="space-between">
            <Button onPress={handleBack} flex={1} variant="outline" colorScheme="coolGray" size="lg" mr={2} >
              <Text >CANCEL</Text>
            </Button>
            <Button flex={1} bg="#00C2C2" size="lg" ml={2} onPress={() => {
                try {
                  navigation.navigate('PAYMENT', { totalPrice, grandTotal });
                } catch (error) {
                  console.error('Navigation error:', error);
                }
              }}>
              <Text>ORDER</Text>
            </Button>
          </HStack>
        </VStack>
    </ScrollView>
  );
};

export default PlaceOrderScreen;
