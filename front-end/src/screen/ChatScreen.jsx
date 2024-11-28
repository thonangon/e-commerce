import React, {useCallback, useState,useEffect} from 'react';
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
import CustomModal from '../components/OptionComponent';
import ButtonClick from '../components/Button';
import {colors} from '../utils/colors';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from '../config/index';
import { API_URL } from '../config/index';

const ShoppingBag = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false); // Control the main checkout modal visibility
  const [showOptionModal, setShowOptionModal] = useState(false); // Control the Option modal visibility
  const quantity = 1;
  const handleAddress = () => {
    navigation.navigate('ADDRESS');
  };

  const handlePlaceOrder = () => {
    const totalItems = selectedItems.reduce((count, item) => count + quantity, 0);
    const totalPrice = selectedItems.reduce((total, item) => total + item.price * quantity, 0);
  
    navigation.navigate('PLACEORDER', {
      items: selectedItems,
      totalItems,
      totalPrice,
    });
  };
  

  const route = useRoute();
  const {itemId} = route.params || {}; // Extract itemId from route params

  // Fetch favorites from Redux store
  const favorites = useSelector(state => state.user?.favorites || []);
  console.log('Favorites from Redux:', favorites);

  // Find the specific item based on the passed itemId
  const selectedItems = itemId
    ? favorites.filter(item => item.id === itemId)
    : favorites;
  console.log('Selected items:', selectedItems);
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await axios.post(`${API_URL}/order/order`, {
          items: selectedItems.map((item) => ({
            productId: item.id,
            quantity,
          })),
        });
        setTotal(response.data.total); 
      } catch (error) {
        console.error('Error fetching total:', error);
      }
    };

    if (selectedItems.length > 0) {
      fetchTotal();
    }
  }, [selectedItems]);
  // Define checkout modal content
  const checkoutBodyContent = (
    <ScrollView>
      {selectedItems
        .filter(item => item.id)
        .map(item => (
          <HStack
            key={item.id}
            padding={3}
            borderBottomWidth={1}
            borderBottomColor="#E5E5E5">
            <Image
              source={{uri: item.image}}
              alt={item.name}
              size="lg"
              borderRadius="md"
              resizeMode="cover"
            />
            <VStack marginLeft={3} justifyContent="center">
              <Text bold fontSize="md">
                {item.name}
              </Text>
              <Text>
                {item.size} | {item.color}
              </Text>
              <Text>Qty: {quantity}</Text>
              <Text bold fontSize="md">
                ${(item.price * quantity).toFixed(2)}
              </Text>
            </VStack>
          </HStack>
        ))}
      <HStack
        padding={3}
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="#E5E5E5">
        <Text bold>SHIPPING</Text>
        <HStack alignItems="center">
          <Text>Free Delivery</Text>
          <IconButton
            onPress={handleAddress}
            icon={
              <Icon name="chevron-forward-outline" size={20} color="black" />
            }
          />
        </HStack>
      </HStack>
      <HStack padding={3} justifyContent="space-between">
        <Text bold>TOTAL</Text>
        <HStack>
          <Text bold fontSize="lg">
            $
            {selectedItems
              .reduce((total, item) => total + item.price * quantity, 0)
              .toFixed(2)
            }
          </Text>
          <IconButton
            onPress={handleAddress}
            icon={
              <Icon name="chevron-forward-outline" size={20} color="black" />
            }
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
  const optionBodyContent = (
    <>
      <HStack>
        <IconButton
          onPress={handleAddress}
          icon={<Icon name="create-outline" size={20} color="black" />}
        />
        <Text mt={2}>Edit quantity</Text>
      </HStack>
      <Divider mt={2} />
      <HStack>
        <IconButton
          icon={
            <Icon name="ellipsis-vertical-outline" size={20} color="black" />
          }
        />
        <Text mt={2}>Change Size</Text>
      </HStack>
      <Divider mt={4} />
      <HStack>
        <IconButton
          icon={<Icon name="heart-outline" size={20} color="black" />}
        />
        <Text mt={2}>Move to favorite</Text>
      </HStack>
      <Divider mt={4} />
      <HStack>
        <IconButton
          icon={<Icon name="trash-outline" size={20} color="black" />}
        />
        <Text mt={2}>Remove from bag</Text>
      </HStack>
    </>
  );
 
  return (
    <NativeBaseProvider>
      <Text ml={3}>{`${selectedItems.length} Items`}</Text>
      <Box safeArea flex="1" bg={colors.bg_home} mt={2}>
        {selectedItems.length === 0 ? (
          <Text textAlign="center" mt={10}>
            No favorite items found.
          </Text>
        ) : (
          <ScrollView>
            {selectedItems.map(item => (
              <VStack key={item.id} mb={0.5}>
                <Box bg="white" p={4}>
                  <HStack space={3} alignItems="center">
                    <Image
                      source={{uri: item.image}}
                      alt={item.name}
                      size="lg"
                      borderRadius="md"
                      resizeMode="cover"
                    />
                    <VStack flex="1">
                      <Text bold fontSize="md" isTruncated>
                        {item.name}
                      </Text>
                      <Text color="gray.500">
                        Size: {item.size} / Color: {item.color}
                      </Text>
                      <Text color="gray.500">Qty: {quantity}</Text>
                      <Text color="gray.500" numberOfLines={2}>
                        {item.description}
                      </Text>
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}>
                        <Text>Total (Excl. Tax):</Text>
                        <Text color="white" p={1} bg={colors.bg_home}>
                          ${item.price}
                        </Text>
                      </HStack>
                    </VStack>
                    <IconButton
                      onPress={() => setShowOptionModal(true)}
                      icon={
                        <Icon
                          name="ellipsis-vertical-outline"
                          size={20}
                          color="black"
                        />
                      }
                      variant="ghost"
                    />
                  </HStack>
                </Box>
                <Divider />
              </VStack>
            ))}
          </ScrollView>
        )}
      </Box>
      <ButtonClick
        bg="#fff"
        color="#00C2C2"
        title="CHECKOUT"
        onPress={() => setShowModal(true)}>
      </ButtonClick>
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="CHECKOUT"
        bodyContent={checkoutBodyContent}
        footerContent={checkoutFooterContent}
      />
      <CustomModal
        isOpen={showOptionModal}
        onClose={() => setShowOptionModal(false)}
        title="OPTION"
        bodyContent={optionBodyContent}
      />
    </NativeBaseProvider>
  );
};
export default ShoppingBag;
