import React from 'react';
import { Box, Text, HStack, Divider, IconButton, Image } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const ShoeItem = ({ item, onNavigate }) => {
  console.log('ShoeItem received item:', item); // Confirm the item has a name

  if (!item) return null;

  return (
    <Box bg="white" >
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
          onPress={() => onNavigate(item.id, item.name)}
          icon={<Icon name="chevron-forward-outline" size={20} color="black" />}
        />
      </HStack>
      <Divider />
    </Box>
  );
};
export default ShoeItem;
