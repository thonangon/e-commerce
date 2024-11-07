import React from 'react';
import { Image } from 'react-native';
import { Box, Text, IconButton } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ image, name, price, code, description }) => {
  const navigation = useNavigation();
  return (

    <Box bg="white" rounded="md" shadow={2} width={250} m={2}>
      <Image source={{ uri: image }} alt={name} style={{ height: 350, width: '100%' }} />

      <IconButton
        icon={<Icon name="favorite-border" size={24} color="black" />}
        onPress={() => navigation.navigate('FAVORITE')}
        position="absolute"
        top={2}
        right={2}
        zIndex={1}
      />

      {/* Product Details */}
      <Box position="absolute" top={220} left={3} padding={2} width="90%">
        <Text fontSize="md" bg="white" color="gray.400" paddingX={1} rounded="sm">
          CODE: {code}
        </Text>
        <Text fontSize="md" bg="white" mt={1} mb={4} paddingX={1} rounded="sm">
          ${price}
        </Text>
        <Text fontSize="sm" bold>
          {name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {description}
        </Text>
      </Box>
    </Box>
  );
}

export default ProductCard;