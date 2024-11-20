import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Box, VStack, HStack, Image, Text, Button, Divider, IconButton } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomModal from '../components/OptionComponent';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/useSlice';

const ShoppingBag = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Get the list of favorite items
  const favorites = useSelector((state) => state.user?.favorites || []);

  const handleAddress = () => {
    navigation.navigate('ADDRESS');
  };

  const handlePlaceOrder = () => {
    navigation.navigate('PLACEORDER');
  };


  const removeItem = (id) => {
    dispatch(removeFavorite({ id })); // Payload is an object with id
  };

  const optionBodyContent = (
    <>
      <HStack  >
        <Button
          onPress={handleAddress}
          leftIcon={<Icon name="create-outline" size={20} color="black" />}
          variant={'unstyled'}
        >

          Edit quantity
        </Button>
      </HStack>
      <Divider mt={2} />
      <HStack>
        <Button
          leftIcon={<Icon name="ellipsis-vertical-outline" size={20} color="black" colorScheme="white" />}
          variant="unstyled"
        >
          <Text>Change Size</Text>
        </Button>

      </HStack>
      <Divider mt={4} />
      <HStack>
        <Button 
        leftIcon={<Icon name="trash-outline" size={20} color="black" />}
        onPress={() => {
          removeItem(selectedItem.id);
          setShowOptionModal(false);
          
        }}
         variant="unstyled"
        >
        <Text>Remove from bag</Text>
        </Button>
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
                      source={item.image}
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
