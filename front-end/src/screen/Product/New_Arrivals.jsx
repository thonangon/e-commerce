import React from 'react';
import { ScrollView, Center, Text, Box } from 'native-base';
import { useRoute } from '@react-navigation/native';
import ProductGrid from './ProductGrid';
import IconsHead from '../../components/Header/Iconshead';

const NewArrivals = () => {
  const route = useRoute();
  const products = route.params?.formattedProducts || [];

  console.log("Products:", products);

  return (
    <>
      <IconsHead
        title="NEW ARRIVALS"
        subtitle={`${products.length} RESULTS`}
        bgColor="#008080"
        
      />

      <ScrollView>
        <Center py={3} bg="#ffeb3b">
          <Text fontSize="md" color="black" fontWeight="bold">- Best Sellers -</Text>
        </Center>

        <Box bg="white" px={4} py={2}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>NEW ARRIVALS: SHOES, CLOTHING & MORE</Text>
          <Text color="gray.500" fontSize="sm">
            Freshen up your wardrobe with new clothes and shoes from adidas. From cutting-edge sportswear to the latest kicks, find the styles you'll love forever.
          </Text>
        </Box>

        <ProductGrid products={products} />
      </ScrollView>
    </>
  );
};

export default NewArrivals;
