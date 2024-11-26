import React from 'react';
import { Box, Text } from 'native-base';
import { Image } from 'react-native';

const ProductCard = ({ image, category, price, description }) => (

    <Box bg="#fff" >
        <Box position="relative">
            <Image
                source={{ uri: image }}
                style={{ width: '100%', height: 270, resizeMode: 'cover' }}
            />

            <Text position="absolute" top={150} left={3} bg="white" fontSize="xs" color="gray.700" >
                Code: {category}
            </Text>
            <Text position="absolute" top={170} left={3} bg="white" fontSize="xs" color="gray.700" bold >
                Price: ${price}
            </Text>

            <Text position="absolute" top={200} left={3} fontSize="sm" bold >
                {description}
            </Text>
            <Text position="absolute" top={218} left={3} fontSize="xs" color="gray.700">
                {category}
            </Text>
        </Box>
    </Box>
);

export default ProductCard;
