import React from 'react';
import { Box, VStack, HStack, Center, Text, ScrollView ,View} from 'native-base';
import ProductCard from './ProductCard';
import ProductCards from '../../components/product/productCard';

const ProductGrid = ({ products }) => (
    <ScrollView 
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    
    > 

    <VStack>
        <HStack flexWrap="wrap" >
            {products.length > 0 ? (
                <Box width="100%" bg="gray.200" borderRadius="md">
                    <ProductCard {...products[0]} description={products[0].description || 'No description'} />
                </Box>
            ) : (
                <Center py={10}>
                    <Text color="gray.500">No products available.</Text>
                </Center>
            )}
        </HStack>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 4 }}>
            {products.map((product, idx) => (
                <View 
                key={idx} 
                style={{
                  width: '40%',  // Each item takes roughly half of the row
                  marginBottom: 16,
                  
                }}
              >
                <ProductCards {...product} />
              </View>
            ))}
        </View>
    </VStack>
    </ScrollView>

);

export default ProductGrid;
