import React from 'react';
import { Box, Text } from 'native-base';
import { Image as RNImage } from 'react-native';

const ProductCard = ({ imageUri, title, category, price, description}) => (
    
    <Box bg="#fff" my={0.5} >
        <Box position="relative">
            <RNImage source={{ uri: imageUri }} style={{ width: '100%', height: 230 }} />

            <Text fontSize="sm" bg="white" px={2} bold>
                {title}
            </Text>
            <Text fontSize="sm" bg="white" px={2} bold>
                Code: {category}
            </Text>
            <Text position="absolute" top={200} left={3} bg="white" px={2} fontSize="xs" color="gray.700">
                Price: ${price}
            </Text>
            <Text position="absolute" top={220} left={3} bg="white" px={2} fontSize="xs" color="gray.700">
                Category: {category}
            </Text>
            <Text position="absolute" top={170} left={3} bg="white" px={2} fontSize="xs" color="gray.700">
                {description}
            </Text>
        </Box>
    </Box>
);

export default ProductCard;
