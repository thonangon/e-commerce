import React from 'react';
import { VStack } from 'native-base';
import ShoeItem from './product_types_card'; 

const ShoesList = ({ shoes, onNavigate }) => {
  console.log('ShoesList received shoes:', shoes); 

  if (!Array.isArray(shoes) || shoes.length === 0) {
    console.log('No shoes data available');
    return null;
  }

  return (
    <VStack space={4}>
      {shoes.map((shoe, index) => (
        <ShoeItem key={index} item={shoe} onNavigate={onNavigate} />
      ))}
    </VStack>
  );
};

export default ShoesList;
