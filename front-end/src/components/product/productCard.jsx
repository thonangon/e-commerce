// ProductCard.js
import React from 'react';
import { Image } from 'react-native';
import { Box, Text } from 'native-base';

const ProductCard = ({ image, name, price, code }) => (
  <Box bg="white" rounded="md" shadow={2} width={250} m={2}>
    <Image source={image} alt={name} style={{ height: 350, width: '100%' }} />
    <Box position="absolute" top={220} left={3} fontSize="sm">
      <Text fontSize="md" bg="#fff" color="gray.400">CODE: {code}</Text>
      <Text fontSize="md" bg="#fff" mt={1} mb={4}>${price}</Text>
      <Text fontSize="sm" bold>{name}</Text>
      <Text fontSize="xs" color="gray.500">Men's Soccer</Text>
    </Box>
  </Box>
);

export default ProductCard;
