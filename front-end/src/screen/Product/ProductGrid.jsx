import React from 'react';
import { Box, VStack, HStack, Center, Text, ScrollView, View } from 'native-base';
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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{

                }}
            >
                <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {products.map((product, idx) => (
                        <View
                            key={idx}
                            style={{
                                width: 250,
                            }}
                        >
                            <ProductCards {...product} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </VStack>
    </ScrollView>

);

export default ProductGrid;
