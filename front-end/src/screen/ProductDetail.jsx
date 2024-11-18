import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';
import { Box, Text, Image, Pressable, VStack } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScrolMenue from '../components/Header/ScrolMenue';
import IconsHead from '../components/Header/Iconshead';

const Loading = () => <ActivityIndicator size="large" color="#00C2C2" />;
const ErrorMessage = ({ message }) => <Text style={styles.error}>Error: {message}</Text>;
const NoProductsMessage = () => <Text style={styles.noProducts}>No products available.</Text>;

const ProductDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { productDataByCategory = [], formattedProducts = [] } = route.params || {};

    const products = (productDataByCategory || []).flatMap(product => {
        return (formattedProducts || [])
            .filter(formattedProduct => formattedProduct.category === product.name)
            .map(matchedFormattedProduct => ({
                id: matchedFormattedProduct.productId || matchedFormattedProduct.id || `temp-${Math.random()}`,
                name: matchedFormattedProduct.name || "Unnamed Product",
                price: matchedFormattedProduct.price || 0,
                image: matchedFormattedProduct.image || 'https://via.placeholder.com/150',
                description: matchedFormattedProduct.description || product.description || "No description available",
                discount: matchedFormattedProduct.discount,
            }));
    });

    // Filter products by search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSpecificProductPress = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            navigation.navigate('DETAILPRODUCT', product);
        }
    };

    return (
        <Box flex={1} bg="white">
            <IconsHead onSearch={setSearchQuery} />
            <Box px={3} py={2}>
                <TextInput
                    placeholder="Search products..."
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </Box>

            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : filteredProducts.length === 0 ? (
                <NoProductsMessage />
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                    renderItem={({ item }) => (
                        <Box width="50%" padding={2} bg="white">
                            <Pressable onPress={() => handleSpecificProductPress(item.id)}>
                                <Image
                                    source={{ uri: item.image }}
                                    alt={item.name}
                                    style={styles.productImage}
                                    accessibilityLabel={`Image of ${item.name}`}
                                />
                                <Box p={3} w="100%">
                                    <Text style={styles.price}>{item.price}</Text>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productDescription}>{item.description}</Text>
                                </Box>
                            </Pressable>
                        </Box>
                    )}
                />
            )}
        </Box>
    );
};

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
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
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
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
});

export default ProductDetail;
