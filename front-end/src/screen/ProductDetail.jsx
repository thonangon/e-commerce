import React, { useState, useEffect } from 'react';
import { ScrollView as RNScrollView, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Box, VStack, HStack, IconButton, Text, Image, Pressable, Center } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Loading = () => <ActivityIndicator size="large" color="#00C2C2" />;
const ErrorMessage = ({ message }) => <Text style={styles.error}>Error: {message}</Text>;
const NoProductsMessage = () => <Text style={styles.noProducts}>No products available.</Text>;

const ProductDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { productDataByCategory = [], formattedProducts = [] } = route.params || {};

    const products = (productDataByCategory || []).flatMap(product => {
        const matchingProducts = (formattedProducts || []).filter(
            formattedProduct => formattedProduct.category === product.name
        );

        return matchingProducts.map(matchedFormattedProduct => ({
            id: product.productId || matchedFormattedProduct.id || `temp-${Math.random()}`,
            name: matchedFormattedProduct.name || "Unnamed Product",
            price: matchedFormattedProduct.price || 0,
            image: matchedFormattedProduct.image || 'https://via.placeholder.com/150',
            description: matchedFormattedProduct.description || product.description || "No description available",
            discount: matchedFormattedProduct.discount,
            isBestSeller: matchedFormattedProduct.isBestSeller,
        }));
    });

    return (
        <Box flex={1} bg="white">
            <HStack justifyContent="space-between" alignItems="center" px={3} py={2} bg="#00C2C2">
                <IconButton
                    icon={<Icon name="chevron-back" size={24} color="white" />}
                    onPress={() => navigation.goBack()}
                    variant="unstyled"
                    accessibilityLabel="Go back"
                />
                <IconButton
                    icon={<Icon name="search" size={24} color="white" />}
                    onPress={() => console.log('Search')}
                    variant="unstyled"
                    accessibilityLabel="Search products"
                />
            </HStack>

            <RNScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <Box pt={1} px={4} mb={3}>
                    <HStack space={3} alignItems="center">
                        {["F50", "FUTURE ICONS", "SUPERLITE 3.0", "VL COURT 3.0"].map((item, index) => (
                            <Center key={index} width={100}>
                                <Text fontSize="12" color="black">{item}</Text>
                            </Center>
                        ))}
                    </HStack>
                </Box>
            </RNScrollView>

            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : products.length === 0 ? (
                <NoProductsMessage />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                    renderItem={({ item }) => (
                        <Box width="50%" padding={2} bg="white">
                            <Pressable onPress={() => console.log(`Selected ${item.name}`)}>
                                <Image
                                    source={{ uri: item.image }}
                                    alt={item.name}
                                    style={styles.productImage}
                                    accessibilityLabel={`Image of ${item.name}`}
                                />
                                <Box p={3} w="100%">
                                    <HStack alignItems="center" space={1}>
                                        {item.discount && (
                                            <Text style={styles.discountedPrice}>
                                                {item.price}
                                            </Text>
                                        )}
                                        <Text style={styles.price}>{item.price}</Text>
                                    </HStack>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productDescription}>{item.description}</Text>
                                </Box>
                                <Pressable style={styles.wishlistIcon}>
                                    <Icon name="heart-outline" size={18} color="black" accessibilityLabel="Add to wishlist" />
                                </Pressable>
                            </Pressable>
                        </Box>
                    )}
                />
            )}
        </Box>
    );
};

const styles = StyleSheet.create({
    error: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
    },
    noProducts: {
        color: 'gray',
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
    },
    scrollContainer: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    discountedPrice: {
        fontSize: 16,
        color: 'red',
        textDecorationLine: 'line-through',
        marginRight: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 4,
    },
    productDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    wishlistIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 50,
    },
});

export default ProductDetail;
