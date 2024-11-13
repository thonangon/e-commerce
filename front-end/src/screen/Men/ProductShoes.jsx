import React from 'react';
import { VStack, HStack, Text } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShoesList from '../../components/product/product_types';

const ShoesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const formattedProducts = route.params?.formattedProducts || {};
  const { items = [] } = route.params || {};

  console.log('ShoesScreen formattedProducts:', formattedProducts); 
  console.log('ShoesScreen products:', items); 

  const products = items.flatMap(subCategoryItem =>
    subCategoryItem.categories.map(category => ({
      id: category.id,
      name: category.name,
      image: category.image
    }))
  );

  console.log('ShoesScreen products (flattened):', products); 

 
  const handleCheckIn = () => {
    navigation.goBack();
  };

  const handleNavigation = (shoeId, shoeName) => {
    navigation.navigate( {
      id: shoeId,
      name: shoeName,
      formattedProducts: formattedProducts,
    });
  };

  return (
    <VStack space={4} p={4} w="100%" maxW="400px" mx="auto">
      <HStack alignItems="center" space={40}>
        <Icon name="chevron-back-outline" size={23} color="black" onPress={handleCheckIn} />
        <Text bold fontSize={16}>SHOES</Text>
      </HStack>
      <ShoesList shoes={products} onNavigate={handleNavigation} formattedProducts={formattedProducts} />
    </VStack>
  );
};

export default ShoesScreen;
