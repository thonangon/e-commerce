import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Box, VStack, HStack, Image, Text, Button, Divider, IconButton, Modal } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../components/OptionComponent';

const ShoppingBag = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);  // Control the main checkout modal visibility
  const [showOptionModal, setShowOptionModal] = useState(false);  // Control the Option modal visibility

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
      price: 100.00,
      quantity: 1,
      image: require('../assets/fav2.png')
    },
    {
      id: 2,
      name: 'Copa Gloro II Firm Ground Soccer Cleats',
      size: 'Size: 8.5',
      color: 'Color: Black',
      price: 120.00,
      quantity: 1,
      image: require('../assets/fav3.png')
    },
    {
      id: 3,
      name: 'F50 League Multi-Ground Soccer Cleats',
      size: 'Size: 7',
      color: 'Color: White/Blue',
      price: 90.00,
      quantity: 2,
      image: require('../assets/fav1.png')
    }
  ];
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
      <Box safeArea flex="1" bg="#03A1AB" mt={2}>
        <ScrollView>
          {cartItems.map((item) => (
            <VStack key={item.id}>
              <Box bg="white">
                <HStack space={3}>
                  <Image
                    source={item.image}
                    alt={item.name}
                    style={{ width: 150, height: 150 }}
                  />
                  <VStack flex="1" justifyContent="space-between">
                    <Text bold fontSize="md">{item.name}</Text>
                    <Button  mb={8}
                      
                      width="90%" 
                      height="30px" 
                      justifyContent="space-between" 
                      onPress={() => navigation.navigate('CHART')}
                      >
                      <HStack>
                        <Text>ADD TO CHART</Text>
                        <IconButton 
                          icon={<Icon name="add-circle-outline" size={20} color="black" />}
                        />
                      </HStack>
                    </Button>
                  </VStack>
                  <IconButton 
                    onPress={() => setShowOptionModal(true)} // Show Option modal on press
                    icon={<Icon name="ellipsis-vertical-outline" size={20} color="black" />}
                  />
                </HStack>
              </Box>
              <Divider />
            </VStack>
          ))}
        </ScrollView>
        <CustomModal
          isOpen={showOptionModal}
          onClose={() => setShowOptionModal(false)}
          title="OPTION"
          bodyContent={optionBodyContent}
        >
        </CustomModal>
      </Box>
    </NativeBaseProvider>
  );
};

export default ShoppingBag;
