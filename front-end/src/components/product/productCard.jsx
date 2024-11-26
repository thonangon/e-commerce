import React from 'react';
import { Image } from 'react-native';
import { Box, Text, IconButton } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/useSlice';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ id, image, name, price, description, category, color }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user?.favorites || []);
  console.log('Favorites from Redux:', favorites);
  const isFavorite = favorites.some((product) => product.id === id);
  const navigation = useNavigation();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ id }));
    } else {
      dispatch(addFavorite({ id, name, image, price, description, category, color }));
      navigation.navigate('FAVORITE');
    }
  };
  return (
    <Box bg="white" rounded="md" width={250} overflow="hidden" >
      <Box padding={2}>
        <Image
          source={{ uri: image }}
          alt={name}
          style={{
            height: 350,
            width: '100%',
            resizeMode: 'cover',
          }}
        />
      </Box>

      <IconButton
        icon={
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={isFavorite ? 'red' : 'black'}
          />
        }
        onPress={handleToggleFavorite}
        position="absolute"
        top={2}
        right={2}
        zIndex={1}
      />

      <Box position="absolute" top={220} left={3} padding={2} width="90%">
        <Text fontSize="md" bg="white" color="gray.400" paddingX={1} rounded="sm">
          CODE: {category}
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
};

export default ProductCard;
