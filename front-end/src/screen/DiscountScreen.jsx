import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Text, Image, Box, Heading, VStack, HStack, Center, Spinner } from 'native-base';
import axios from 'axios';

const DiscountScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:8000/product/products/');
                const allProducts = response.data.results;

                const discountedProducts = allProducts.filter(
                    (product) =>
                        product.discount &&
                        product.discount.some((d) => d.isActive)
                );

                setProducts(discountedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderProduct = ({ item }) => {
        const { productName, heading, subHeading, images, discount } = item;

        return (
            <Box
                w="190"
                bg="white"
                borderRadius="8"
                shadow="2"
                p="3"
                mr="3"
            >
                {images && images.length > 0 && (
                    <Image
                        source={{ uri: images[0]?.image }}
                        alt={productName}
                        size="100px"
                        borderRadius="8"
                        mb="2"
                    />
                )}
                <VStack>
                    <Text bold>{productName}</Text>
                    <Text color="gray.600">{heading}</Text>
                    <Text color="gray.400">{subHeading}</Text>
                    {discount && discount.map((d, index) => (
                        d.isActive && (
                            <Text key={index} color="red.500" bold>
                                Discount: {d.percentage}%
                            </Text>
                        )
                    ))}
                </VStack>
            </Box>
        );
    };

    return (
        <ScrollView p="4" bg="gray.100">
            <Heading size="lg" textAlign="center" mb="4">Best Sellers</Heading>
            {loading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : products.length > 0 ? (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.productId.toString()}
                    renderItem={renderProduct}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
            ) : (
                <Text textAlign="center" color="gray.600">
                    No discounted products available.
                </Text>
            )}
        </ScrollView>
    );
};

export default DiscountScreen;