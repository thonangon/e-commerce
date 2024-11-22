import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Box, VStack, HStack, Image, Text, Button, Divider, IconButton } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../components/OptionComponent';
import { useSelector } from 'react-redux';

const ShoppingBag = () => {
  const navigation = useNavigation();
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item for options modal

  // Get the list of favorite items
  const favorites = useSelector((state) => state.user?.favorites || []);

  const handleAddress = () => {
    navigation.navigate('ADDRESS');
  };

  const handlePlaceOrder = () => {
    navigation.navigate('PLACEORDER');
  };

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
          icon={<Icon name="ellipsis-vertical-outline" size={20} color="black" />}
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
        <Text ml={3}>{`${favorites.length} Items`}</Text>
      </Box>
      <Box safeArea flex="1" bg="#03A1AB" mt={2}>
        {favorites.length === 0 ? (
          <Text textAlign="center" mt={4} fontSize="md">
            No favorites yet. Add some products!
          </Text>
        ) : (
          <ScrollView>
            {favorites.map((item) => (
              <VStack key={item.id}>
                <Box bg="white" mb={0.5}>
                  <HStack space={3}>
                    <Image
                      source={ item.image }  
                      alt={item.image}
                      style={{ width: 150, height: 150 }}
                    />
                    
                    <VStack flex="1" justifyContent="space-between">
                      <Text bold fontSize="md">{item.name}</Text>
                      <Button
                        mb={8}
                        width="90%"
                        height="30px"
                        justifyContent="space-between"
                        onPress={() => navigation.navigate('CHART')}
                      >
                        <HStack>
                          <Text>ADD TO CHART</Text>
                          <IconButton
                            icon={<Icon name="cart-outline" size={20} color="black" />}
                          />
                        </HStack>
                      </Button>
                    </VStack>
                    <IconButton
                      onPress={() => {
                        setSelectedItem(item); 
                        setShowOptionModal(true); 
                      }}
                      icon={<Icon name="ellipsis-vertical-outline" size={20} color="black" />}
                    />
                  </HStack>
                </Box>
                <Divider />
              </VStack>
            ))}
          </ScrollView>
        )}
      </Box>
      <CustomModal
        isOpen={showOptionModal}
        onClose={() => setShowOptionModal(false)}
        title="OPTION"
        bodyContent={optionBodyContent}
        selectedItem={selectedItem} 
      />
    </NativeBaseProvider>
  );
};

export default ShoppingBag;
