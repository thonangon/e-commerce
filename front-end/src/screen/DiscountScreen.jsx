import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, ImageBackground, Image } from 'react-native';
import { Text, Box, Heading, HStack, Center, Spinner, IconButton, Icon, Flex } from 'native-base';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DiscountScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoriteState, setFavoriteState] = useState({});
    const navigation = useNavigation();

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

    const handleHeartClick = (item) => {
        setFavoriteState((prev) => ({
            ...prev,
            [item.productId]: !prev[item.productId],
        }));

        navigation.navigate('FAVORITE', {
            productId: item.productId,
        });
    };

    const renderProduct = ({ item }) => {
        const { productName, heading, images, discount, price, oldPrice } = item;

        return (
            <Box
                rounded="md"
                overflow="hidden"
                width={200}
                height={280}
                position="relative"
                bg="gray.300"
                padding="0.5"
                margin={1}
            >
                {images && images.length > 0 && (
                    <ImageBackground
                        source={{ uri: images[0]?.image }}
                        style={{
                            width: '100%',
                            height: '90%',
                            justifyContent: 'flex-end',
                        }}
                        imageStyle={{
                            resizeMode: 'cover',
                        }}
                    >
                        <IconButton
                            icon={
                                <Icon
                                    as={Ionicons}
                                    name={favoriteState[item.productId] ? 'heart' : 'heart-outline'}
                                    size={6}
                                    color={favoriteState[item.productId] ? 'red.500' : 'black'}
                                />
                            }
                            position="absolute"
                            top="2"
                            right="2"
                            onPress={() => handleHeartClick(item)}
                        />

                        <Box p="2" width="100%">
                            <Text fontSize="xs" color="black" bold bg="white" width="50%">
                                BEST SELLER
                            </Text>

                            <HStack alignItems="center" mt="2" justifyContent="space-between">
                                <Text fontSize="sm" bold color="green.500" bg="white">
                                    ${price}
                                </Text>

                                {oldPrice && (
                                    <Text fontSize="xs" color="gray.300" textDecorationLine="line-through">
                                        ${oldPrice}
                                    </Text>
                                )}

                                {discount &&
                                    discount.map(
                                        (d, index) =>
                                            d.isActive && (
                                                <Box
                                                    key={index}
                                                    bg="red.500"
                                                    px="2"
                                                    py="1"
                                                    rounded="sm"
                                                >
                                                    <Text color="white" bold fontSize="xs">
                                                        {d.percentage}%
                                                    </Text>
                                                </Box>
                                            )
                                    )}
                            </HStack>

                            <Text fontSize="sm" color="black" bold>
                                {productName}
                            </Text>
                            <Text fontSize="xs" color="black">
                                {heading}
                            </Text>
                        </Box>
                    </ImageBackground>
                )}
            </Box>
        );
    };

    return (
        <ScrollView p="4" bg="teal.500">
            <Heading size="lg" textAlign="center" mb="4" color="teal.500" bg='white'>
                — Best Sellers —
            </Heading>

            {/* ========== Banner ============ */}
            {products.length > 0 && (
                <Box bg="#fff">
                    <Box position="relative">
                        <Image
                            source={{ uri: products[0]?.images[0]?.image }}
                            style={{ width: '100%', height: 270, resizeMode: 'cover' }}
                        />
                        <Box
                            position="absolute"
                            top={100}
                            left={3}
                            width={40}


                        >

                            <Text fontSize="xs" color="black" bold bg="white" width="50%">
                                BEST SELLER
                            </Text>

                        </Box>
                        <Box
                            position="absolute"
                            top={130}
                            left={3}
                            width="100%"
                            px={3} 
                        >
                            <Flex
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box>
                                    <Text fontSize="sm" bold color="green.500" bg="white">
                                        ${products[0]?.price}
                                    </Text>

                                    {products[0]?.oldPrice && (
                                        <Text fontSize="xs" color="gray.300" textDecorationLine="line-through">
                                            ${products[0]?.oldPrice}
                                        </Text>
                                    )}
                                </Box>

                                {products[0]?.discount &&
                                    products[0]?.discount.map(
                                        (d, index) =>
                                            d.isActive && (
                                                <Box key={index} bg="red.500" px={2} py={1} rounded="sm">
                                                    <Text color="white" bold fontSize="xs">
                                                        {d.percentage}%
                                                    </Text>
                                                </Box>
                                            )
                                    )}
                            </Flex>
                        </Box>




                        <Text position="absolute" top={170} left={3} bg="white" fontSize="xs" color="gray.700" bold>
                            {products[0]?.productName}
                        </Text>

                        <Text position="absolute" top={200} left={3} fontSize="sm" bold>
                            {products[0]?.heading}
                        </Text>
                    </Box>
                </Box>
            )}
            {/* =========================== */}

            <Box style={{ flex: 1 }} bg="teal.500">
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
                        contentContainerStyle={{ paddingBottom: 5 }}
                    />
                ) : (
                    <Text textAlign="center" color="gray.600">
                        No discounted products available.
                    </Text>
                )}
            </Box>
        </ScrollView>
    );
};

export default DiscountScreen;
