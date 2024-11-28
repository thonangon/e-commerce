import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from 'react-native';
import { Box, Text, Image, Pressable } from 'native-base';
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
    const [productDetails, setProductDetails] = useState([]);

    const { 
        productDataByCategory = [], 
        formattedProducts = [] 
    } = route.params || {};

    const products = Array.isArray(productDataByCategory) && Array.isArray(formattedProducts)
    ? productDataByCategory.flatMap(product =>
        formattedProducts
            .filter(formattedProduct => formattedProduct.category === product.name)
            .map(matchedProduct => ({
                id: matchedProduct.id || `temp-${Math.random()}`, // Ensure valid ID
                name: matchedProduct.name || 'Unnamed Product',
                price: matchedProduct.price || '0.00',
                subHeading: matchedProduct.subHeading || 'No subheading available',
                images: Array.isArray(matchedProduct.image)
                    ? matchedProduct.image
                    : [matchedProduct.image || 'https://via.placeholder.com/150'],
                colors: Array.isArray(matchedProduct.colors)
                    ? matchedProduct.colors
                    : [matchedProduct.colors || 'No color available'],
                sizes: Array.isArray(matchedProduct.size_number)
                    ? matchedProduct.size_number
                    : [matchedProduct.size_number || 'No size'],
                description: matchedProduct.description || 'No description available',
            }))
    )
    : [productDataByCategory];
    

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleSpecificProductPress = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            navigation.navigate('DETAILPRODUCT', {
                name: product.name,
                price: product.price,
                images: product.images,
                colors: product.colors, 
                sizes: product.sizes, 
                description: product.description,
                heading: product.subHeading,
                subHeading: product.subHeading,
                
            });
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
                    numColumns={2} 
                    renderItem={({ item }) => (
                        <Box style={styles.productContainer}>
                            <Pressable onPress={() => handleSpecificProductPress(item.id)}>
                                {/* Check if images is an array and render first image if available */}
                                <Image
                                    source={{ uri: Array.isArray(item.images) ? item.images[0] : item.images }}
                                    alt={item.name}
                                    style={styles.productImage}
                                    accessibilityLabel={`Image of ${item.name}`}
                                />
                                <Box p={3} w="100%">
                                    <Text style={styles.price}>${item.price}</Text>
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
    productContainer: {
        width: '48%', 
        padding: 2,
        backgroundColor: 'white',
        margin: 4,
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
