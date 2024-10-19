import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Button,
  Divider,
  IconButton,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../components/OptionComponent'; // Import the reusable CustomModal component
import ButtonClick from '../components/Button';
import { colors } from "../utils/colors";
const ShoppingBag = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false); // Control the main checkout modal visibility
  const [showOptionModal, setShowOptionModal] = useState(false); // Control the Option modal visibility

  const handleAddress = () => {
    navigation.navigate('ADDRESS');
  };

  const handlePlaceOrder = () => {
    navigation.navigate('PLACEORDER');
  };

  const cartItems = [
    {
      id: 1,
      name: 'MESSI F50 PRO FIRM GROUND SOCCER CLEATS',
      size: 'Size: 9',
      color: 'Color: Gold',
      price: 100.0,
      quantity: 1,
      image: require('../assets/fav2.png'),
    },
    {
      id: 2,
      name: 'Copa Gloro II Firm Ground Soccer Cleats',
      size: 'Size: 8.5',
      color: 'Color: Black',
      price: 120.0,
      quantity: 1,
      image: require('../assets/fav3.png'),
    },
    {
      id: 3,
      name: 'F50 League Multi-Ground Soccer Cleats',
      size: 'Size: 7',
      color: 'Color: White/Blue',
      price: 90.0,
      quantity: 2,
      image: require('../assets/fav1.png'),
    },
  ];

  // Define checkout modal content
  const checkoutBodyContent = (
    <ScrollView>
      {cartItems.map((item) => (
        <HStack key={item.id} padding={3} borderBottomWidth={1} borderBottomColor="#E5E5E5">
          <Image
            source={item.image}
            alt={item.name}
            style={{width: 100, height: 100, borderRadius: 8}}
          />
          <VStack marginLeft={3} justifyContent="center">
            <Text bold fontSize="md">{item.name}</Text>
            <Text>{item.size} | {item.color}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text bold fontSize="md">${(item.price * item.quantity).toFixed(2)}</Text>
          </VStack>
        </HStack>
      ))}
      <HStack padding={3} justifyContent="space-between" borderBottomWidth={1} borderBottomColor="#E5E5E5">
        <Text bold>SHIPPING</Text>
        <HStack alignItems="center">
          <Text>Free Delivery</Text>
          <IconButton
            onPress={handleAddress}
            icon={<Icon name="chevron-forward-outline" size={20} color="black" />}
          />
        </HStack>
      </HStack>
      <HStack padding={3} justifyContent="space-between">
        <Text bold>TOTAL</Text>
        <HStack>
          <Text bold fontSize="lg">${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</Text>
          <IconButton
              onPress={handleAddress}
              icon={<Icon name="chevron-forward-outline" size={20} color="black" />}
            />
        </HStack>
      </HStack>
    </ScrollView>
  );
  

  const checkoutFooterContent = (
    <Button
      bottom={7}
      alignSelf="center"
      bg="#D0D3D9E5"
      width="100%"
      onPress={handlePlaceOrder}>
      <HStack space={200} alignItems="center">
        <Text color="#000" fontSize="md">
          PLACE ORDER
        </Text>
        <IconButton
          icon={<Icon name="arrow-forward-outline" color="black" />}
        />
      </HStack>
    </Button>
  );

  // Define option modal content
  const optionBodyContent = (
    <>
      <HStack>
        <IconButton
          onPress={handleAddress}
          icon={<Icon name="create-outline" size={20} color="black" />}
        />
        <Text>Edit quantity</Text>
      </HStack>
      <Divider mt={2} />
      <HStack>
        <IconButton
          icon={
            <Icon name="ellipsis-vertical-outline" size={20} color="black" />
          }
        />
        <Text>Change Size</Text>
      </HStack>
      <Divider mt={4} />
      <HStack>
        <IconButton
          icon={<Icon name="heart-outline" size={20} color="black" />}
        />
        <Text>Move to favorite</Text>
      </HStack>
      <Divider mt={4} />
      <HStack>
        <IconButton
          icon={<Icon name="trash-outline" size={20} color="black" />}
        />
        <Text>Remove from bag</Text>
      </HStack>
    </>
  );

  return (
    <NativeBaseProvider>
      <Box>
        <Text ml={3}>3Item</Text>
      </Box>
      <Box safeArea flex="1" bg={colors.bg_button} mt={2}>
        <ScrollView>
          {cartItems.map(item => (
            <VStack key={item.id}>
              <Box bg="white">
                <HStack space={3}>
                  <Image
                    source={item.image}
                    alt={item.name}
                    style={{width: 150, height: 150}}
                  />
                  <VStack flex="1" justifyContent="space-between">
                    <Text bold fontSize="md">
                      {item.name}
                    </Text>
                    <Text>
                      {item.size} | {item.color}
                    </Text>
                    <Text>Qty: {item.quantity}</Text>
                    <HStack justifyContent="space-between" mb={3}>
                      <Text>Total (Excl. Tax)</Text>
                      <Text bold bg="#00C2C2" width="30%" textAlign="center">
                        ${item.price}
                      </Text>
                    </HStack>
                  </VStack>
                  <IconButton
                    onPress={() => setShowOptionModal(true)} // Show Option modal on press
                    icon={
                      <Icon
                        name="ellipsis-vertical-outline"
                        size={20}
                        color="black"
                      />
                    }
                  />
                </HStack>
              </Box>
              <Divider />
            </VStack>
          ))}
        </ScrollView>
        <ButtonClick bg="#fff" color="#00C2C2" title="CHECKOUT" onPress={() => setShowModal(true)} ></ButtonClick>

        {/* Use CustomModal for Checkout */}
        <CustomModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="CHECKOUT"
          bodyContent={checkoutBodyContent}
          footerContent={checkoutFooterContent}
        />

        {/* Use CustomModal for Option */}
        <CustomModal
          isOpen={showOptionModal}
          onClose={() => setShowOptionModal(false)}
          title="OPTION"
          bodyContent={optionBodyContent}
        />
      </Box>
    </NativeBaseProvider>
  );
};

export default ShoppingBag;
