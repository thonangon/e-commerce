import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScrolMenue from '../../components/Header/ScrolMenue';
import IconsHead from '../../components/Header/Iconshead';

const DetailProduct = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const { name, price, image, colors = [], sizes = [], description,heading,subHeading } = route.params || {};
    return (
        <View >
            <IconsHead></IconsHead>
            <ScrollView style={styles.container}>

                <Image source={{ uri: image }} style={styles.productImage} />
                <ScrollView horizontal style={styles.thumbnailContainer}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Image key={index} source={{ uri: image }} style={styles.thumbnail} />
                    ))}
                </ScrollView>
                <Text style={styles.productTitle}>{name}</Text>
                <Text style={styles.productPrice}>${price}</Text>
                <Text style={styles.productDescription}>{description}</Text>
                <Text style={styles.sectionTitle}>Size</Text>
                <View style={styles.sizeContainer}>
                    {(Array.isArray(sizes) ? sizes : []).map((size, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.sizeBox,
                                selectedSize === size && styles.sizeBoxSelected,
                            ]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text style={styles.sizeText}>{size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Color</Text>
                <View style={styles.colorContainer}>
                    {(Array.isArray(colors) ? colors : []).map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.colorBox,
                                { backgroundColor: color },
                                selectedColor === color && styles.colorBoxSelected,
                            ]}
                            onPress={() => setSelectedColor(color)}
                        />
                    ))}
                </View>
                <Text>{heading}</Text>
                <Text>{subHeading}</Text>
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
        borderColor: '#000',
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
    },
    colorBoxSelected: {
        borderColor: '#000',
    },
});

export default DetailProduct;
