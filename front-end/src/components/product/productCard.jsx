import React from 'react';
import { Image } from 'react-native';
import { Box, Text, IconButton } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { addFavoriteProduct, removeFavoriteProduct } from '../../store/useSlice'
import { useSelector,useDispatch } from 'react-redux';


const ProductCard = ({ image, name, price, description, category }) => {
  const {fevorite} = useSelector((state) => state.user) 
  console.log('my favorit:',fevorite);
  const dispatch = useDispatch();
  const handleFavorite = (product) => {
    if (fevorite.includes(product)) {
      dispatch(removeFavoriteProduct(product));
    } else {
      dispatch(addFavoriteProduct(product));
    }
  };
  
  
  const navigation = useNavigation();
  return (

    <Box bg="white" rounded="md" width={250} >
      <Image source={{ uri: image }} alt={name} style={{ height: 350, width: '100%' }} />

      <IconButton
        icon={<Icon name="favorite-border" size={24} color="black" />}
        onPress={() => handleFavorite(ProductCard)
        }
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
}

export default ProductCard;