import React from 'react';
import { Box, Text, HStack, Divider, IconButton, Image } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const ShoeItem = ({ item, onNavigate }) => {
  return (
    <Box bg="white" p={2}>
      <HStack flex="1" justifyContent="space-between" alignItems="center">
        <Image
          source={item.image}
          alt={item.name}
          style={{ width: 150, height: 150 }}
        />
        <Text flexShrink={1}>{item.name}</Text>
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
