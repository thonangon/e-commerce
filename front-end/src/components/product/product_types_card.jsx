import React from 'react';
import { Box, Text, HStack, Divider, IconButton, Image } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

<<<<<<< HEAD
const ShoeItem = ({ item, onNavigate }) => {
  console.log('ShoeItem received item:', item); 
  if (!item) return null;
=======
const ShoeItem = ({ item, onNavigate, formattedProducts }) => {
  // console.log('ShoeItem received item:', item); // Confirm the item has a name

  if (!item) return null;

  // Prepare product details for navigation
  const productDetails = { productDataByCategory: [item], formattedProducts };

>>>>>>> 46ea0a33a3c522c3f275cf86b0f96e692fc27219
  return (
    <Box bg="white">
      <HStack justifyContent="space-between" alignItems="center">
        <Image
          source={{ uri: item.image }}
          alt={item.name || "Shoe"}
          style={{ width: 100, height: 100 }}
        />
        <Text flexShrink={1} fontSize="lg" style={{ width: 100 }}>
          {item.name || "Unknown Shoe"}
        </Text>
        <IconButton
          onPress={() => onNavigate(productDetails)} // Pass productDetails, which includes formattedProducts
          icon={<Icon name="chevron-forward-outline" size={20} color="black" />}
        />
      </HStack>
      <Divider />
    </Box>
  );
};

export default ShoeItem;
