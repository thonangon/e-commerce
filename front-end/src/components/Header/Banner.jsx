import React from 'react';
import { Box, Text } from 'native-base';
import { Image as RNImage } from 'react-native';

const Banner = () => (
    <Box bg="#fff" my={4}>
        <Box position="relative">
            <RNImage
                source={require('../../assets/category_page.png')}
                alt="Back to School"
                style={{ width: '100%', height: 230 }}
            />
            <Text position="absolute" top={140} left={3} fontSize="sm" bg="white" px={2} bold>
                SAVE ON BACK TO SCHOOL
            </Text>
            <Text position="absolute" top={170} left={3} bg="white" px={2}>
                30% off full price and sale. Use code: KIDS
            </Text>
        </Box>
    </Box>
);

export default Banner;
