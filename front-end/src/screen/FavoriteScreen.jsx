import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Box, VStack, HStack, Image, Text, Button, Divider, IconButton, Modal } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation ,useRoute } from '@react-navigation/native';
import CustomModal from '../components/OptionComponent';

const ShoppingBag = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);  
  const [showOptionModal, setShowOptionModal] = useState(false);  
  const handleAddress = () => {
    navigation.navigate('ADDRESS');
  };

  const handlePlaceOrder = () => {
    navigation.navigate('PLACEORDER');
  };

  const {
    image,
    name,
    price,
    description,
    category,
  } = route.params || {};

  const cartItems = image ? [{ id: 1, image, name, price, description, category }] : [];
  
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
                    source={{ uri: item.image }}
                    alt={item.name}
                    style={{ width: 150, height: 150, borderRadius: 8 }}
                  />
                  <VStack flex="1" justifyContent="space-between">
                    <Text bold fontSize="md">{item.name}</Text>
                    <Text bold fontSize="md">{item.price}</Text>
                    <Text bold fontSize="md">{item.description}</Text>
                    <Text bold fontSize="md">{item.category}</Text>
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
