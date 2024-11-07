import React from 'react';
import { Box, Text } from 'native-base';
import { Image as RNImage } from 'react-native';

const ProductCard = ({ image, name }) => (
    <Box bg="white" rounded="md" shadow={2} width={200} margin={2} position="relative">
        <RNImage source={{ uri: `http://10.0.2.2:8000${image}` }} alt={name} style={{ height: 150, width: '100%' }} />
        <Text fontSize="md" mt={2} mb={1} bold>{name}</Text>
    </Box>
);

export default ProductCard;
