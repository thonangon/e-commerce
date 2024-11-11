import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Box, Text, Icon, VStack, HStack, Center, IconButton } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const New_Arrivals = () => {
  const route = useRoute();

  const products = route.params?.formattedProducts || [];
  console.log('-------------Products--------:', products);

  return (
    <ScrollView>
      <Center bg="#008080" py={4}>
        <Text color="white" fontSize="lg" fontWeight="bold">NEW ARRIVALS</Text>
        <Text color="gray.300">{products.length} RESULTS</Text>
      </Center>

      <Center py={3} bg="#ffeb3b">
        <Text fontSize="md" color="black" fontWeight="bold">- Best Sellers -</Text>
      </Center>

      <Box px={4} py={2}>
        <Text fontSize="lg" fontWeight="bold">NEW ARRIVALS: SHOES, CLOTHING & MORE</Text>
        <Text color="gray.500">
          Freshen up your wardrobe with new clothes and shoes from adidas. From cutting-edge sportswear to the latest kicks, find the styles you'll love forever.
        </Text>
      </Box>

      <VStack space={4} px={4} py={2}>
        {products.length > 0 ? (
          products.map((item, index) => (
            <HStack key={index} justifyContent="space-between">
              <ProductCard
                imageUri={item.image}
                title={item.name}
                category={item.category}
                price={item.price}
                code={item.code || 'N/A'} // Use 'N/A' if code is missing
              />
            </HStack>
          ))
        ) : (
          <Center py={10}>
            <Text color="gray.500">No products available.</Text>
          </Center>
        )}
      </VStack>
    </ScrollView>
  );
};

const ProductCard = ({ imageUri, title, category, price, code }) => (
  <Box width="48%" bg="gray.100" borderRadius="md" overflow="hidden">
    <Image source={{ uri: imageUri }} style={{ width: '100%', height: 150 }} />
    <IconButton
      icon={<Icon as={Ionicons} name="heart-outline" size="sm" />}
      position="absolute"
      top={2}
      right={2}
      bg="white"
      borderRadius="full"
    />
    <Box p={3}>
      <Text fontSize="xs" color="gray.500">CODE: {code}</Text>
      <Text fontSize="md" fontWeight="bold" color="black">{price}</Text>
      <Text fontSize="sm" fontWeight="bold" color="black">{title}</Text>
      <Text fontSize="xs" color="gray.500">{category}</Text>
    </Box>
  </Box>
);

export default New_Arrivals;
