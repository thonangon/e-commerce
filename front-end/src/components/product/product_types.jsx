import React from 'react';
import { VStack } from 'native-base';
import ShoeItem from './product_types_card'; 
import { useNavigation } from '@react-navigation/native';

const ShoesList = ({ shoes, onNavigate, formattedProducts }) => {
  const navigation = useNavigation();
  
  const handleNavigate = (productDetails) => {
    navigation.navigate('PRODUCTDETAIL', { ...productDetails, formattedProducts });
  };

  if (!Array.isArray(shoes) || shoes.length === 0) {
    console.log('No shoes data available');
    return null;
  }

  return (
    <VStack space={4}>
      {shoes.map((shoe, index) => (
        <ShoeItem 
          key={index} 
          item={shoe} 
          onNavigate={handleNavigate} 
          formattedProducts={formattedProducts} 
        />
      ))}
    </VStack>
  );
};

export default ShoesList;
