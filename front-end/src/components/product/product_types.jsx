import React from 'react';
import { ScrollView, VStack, Box } from 'native-base';
import ShoeItem from './product_types_card';

const ShoesList = ({ shoes, onNavigate }) => {
  return (
    <ScrollView>
      <Box flex="1" bg="#03A1AB" mt={2} p={2}>
        {shoes.map((item) => (
          <VStack key={item.id}>
            <ShoeItem item={item} onNavigate={onNavigate} />
          </VStack>
        ))}
      </Box>
    </ScrollView>
  );
};

export default ShoesList;
