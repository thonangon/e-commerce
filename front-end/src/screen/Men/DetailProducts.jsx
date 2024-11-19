import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import IconsHead from '../../components/Header/Iconshead';
import ProductSession from '../../components/product/productCard';

const DetailProduct = () => {
    const route = useRoute();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    // Extracting product details from route params
    const { 
        name, 
        price, 
        images = [], 
        colors = [], 
        sizes = [], 
        description, 
        heading, 
        subHeading, 
        filteredProducts 
    } = route.params || {};

    // Ensure images is always an array
    const imageArray = Array.isArray(images) ? images : [images].filter(Boolean); // Convert to array if it's a string

    console.log('sizes:', sizes);
    console.log('colors:', colors);
    console.log('images:', imageArray);

    return (
        <View>
            <IconsHead />
            <ScrollView style={styles.container}>
                {/* Main Product Image */}
                <Image 
                    source={{ uri: imageArray[0] || 'https://via.placeholder.com/250' }} 
                    style={styles.productImage} 
                />

                {/* Thumbnails for Images */}
                <ScrollView horizontal style={styles.thumbnailContainer}>
                    {imageArray.map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => console.log(`Selected Image: ${image}`)}>
                            <Image 
                                source={{ uri: image }} 
                                style={styles.thumbnail} 
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Product Details */}
                <Text style={styles.productTitle}>{name}</Text>
                <Text style={styles.productPrice}>${price}</Text>
                <Text style={styles.productDescription}>{description}</Text>

                {/* Size Selector */}
                <Text style={styles.sectionTitle}>Size</Text>
                <View style={styles.sizeContainer}>
                    {sizes.map((size, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.sizeBox, 
                                selectedSize === size && styles.sizeBoxSelected
                            ]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text style={styles.sizeText}>{size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Color Selector */}
                <Text style={styles.sectionTitle}>Color</Text>
                <View style={styles.colorContainer}>
                    {colors.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.colorBox, 
                                { backgroundColor: color }, 
                                selectedColor === color && styles.colorBoxSelected
                            ]}
                            onPress={() => setSelectedColor(color)} 
                        >
                            {selectedColor === color && <Text style={styles.colorCheck}>✔</Text>}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Selected Color Preview */}
                {selectedColor && (
                    <View style={styles.selectedColorPreview}>
                        <Text style={styles.previewText}>Selected Color:</Text>
                        <View 
                            style={[
                                styles.colorPreviewBox, 
                                { backgroundColor: selectedColor }
                            ]} 
                        />
                    </View>
                )}

                {/* Other Product Information */}
                <Text>{heading}</Text>
                <Text>{subHeading}</Text>
                {/* Product Session Component */}
                <ProductSession />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    productImage: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
    },
    thumbnailContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    thumbnail: {
        width: 60,
        height: 60,
        marginRight: 8,
        borderRadius: 4,
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    sizeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sizeBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },
    sizeBoxSelected: {
        borderColor: '#000',  // Highlight selected size
    },
    sizeText: {
        fontSize: 16,
    },
    colorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    colorBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 4,
        borderWidth: 2,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorBoxSelected: {
        borderColor: '#000',  // Highlight selected color
    },
    colorCheck: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedColorPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    previewText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    colorPreviewBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default DetailProduct;
