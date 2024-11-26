import React,{useCallback, useEffect} from 'react';
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
        <HStack justifyContent="space-between"  alignItems="center">
          <Text fontSize="lg" fontWeight="bold">PLACE ORDER</Text>
          <Button variant="ghost" colorScheme="coolGray" size="sm" onPresas={handleBack}>
            <Text fontSize="lg">✕</Text>
          </Button>
        </HStack>
        <Divider my={2} />
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
        <VStack mt={6} space={2}>
          <Text fontSize="md" fontWeight="bold">ACCEPTED PAYMENT METHODS</Text>
          <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" mt={10}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png' }} alt="Amex" size="lg"  />
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' }} alt="mastercard" size="lg" /> 
          </HStack>
        </VStack>
        <HStack mt={150} justifyContent="space-between">
          <Button flex={1} variant="outline" colorScheme="coolGray" size="lg" mr={2} >
            <Text >CANCEL</Text>
          </Button>
          <Button flex={1} bg="#00C2C2" size="lg" ml={2} >
            <Text>ORDER</Text>
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
export default PlaceOrderScreen;
