import React from 'react';
import { VStack } from 'native-base';
import ShoeItem from './product_types_card'; 
import { useNavigation } from '@react-navigation/native';

const ShoesList = ({ shoes, onNavigate, formattedProducts }) => {
  // console.log('ShoesList received shoes:', shoes);
  const navigation = useNavigation();
  
  const handleNavigate = (productDetails) => {
    // Ensure you're passing formattedProducts with the product details
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
          formattedProducts={formattedProducts} // Pass formattedProducts here
        />
      ))}
    </VStack>
  );
};

export default ShoesList;
