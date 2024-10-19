import React from 'react';
import { VStack, HStack, Box, Text, Button, Divider, Image } from 'native-base';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const PlaceOrderScreen = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <VStack space={4} p={4}>

        {/* Header */}
        <HStack justifyContent="space-between"  alignItems="center">
          <Text fontSize="lg" fontWeight="bold">PLACE ORDER</Text>
          <Button variant="ghost" colorScheme="coolGray" size="sm" onPress={handleBack}>
            <Text fontSize="lg">✕</Text>
          </Button>
        </HStack>
        <Divider my={2} />
        {/* Order Summary */}
        <VStack space={2} mt={4} >
          <Text fontSize="md" fontWeight="bold">ORDER SUMMARY</Text>
          
          <HStack justifyContent="space-between">
            <Text>3 items</Text>
            <Text>$350.00</Text>
          </HStack>

          <HStack justifyContent="space-between">
            <Text>Shipping</Text>
            <Text>FREE</Text>
          </HStack>

          <HStack justifyContent="space-between">
            <Text>Tax</Text>
            <Text>$0.00</Text>
          </HStack>

          <Divider my={2} />

          <HStack justifyContent="space-between">
            <Text fontSize="lg" fontWeight="bold">Total</Text>
            <Text fontSize="lg" fontWeight="bold">$350.00</Text>
          </HStack>
        </VStack>

        {/* Accepted Payment Methods */}
        <VStack mt={6} space={2}>
          <Text fontSize="md" fontWeight="bold">ACCEPTED PAYMENT METHODS</Text>
          <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
            {/* Payment Method Icons */}
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/American_Express_logo_%282018%29.svg' }} alt="Amex" size="xs" />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Discover_Card_logo.svg' }} alt="Discover" size="xs" />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Mastercard-logo.svg' }} alt="Mastercard" size="xs" />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Klarna_logo.svg' }} alt="Klarna" size="xs" />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg' }} alt="Google Pay" size="xs" />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Visa_2014.svg' }} alt="Visa" size="xs" />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Affirm_logo.svg' }} alt="Affirm" size="xs" />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Afterpay_logo_2020.svg' }} alt="Afterpay" size="xs" />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' }} alt="PayPal" size="xs" />
          </HStack>
        </VStack>

        {/* Action Buttons */}
        <HStack mt={250} justifyContent="space-between">
          <Button flex={1} variant="outline" colorScheme="coolGray" size="lg" mr={2}>
            <Text>CANCEL</Text>
          </Button>
          <Button flex={1} bg="#00C2C2" size="lg" ml={2} >
            <Text>ORDER</Text>
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default PlaceOrderScreen;
