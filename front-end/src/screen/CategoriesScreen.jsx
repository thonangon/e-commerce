import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Divider } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import ProductSection from '../components/product/productSection';
import Banner from '../components/SoccerMen/Banner';
import { API_URL } from '../config/index';

const HomeScreen = () => {
  const navigation = useNavigation();

  // State Variables
  const [productDataByCategory, setProductDataByCategory] = useState({});
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [subCategories, setSubCategories] = useState([]);
  
  const mainCategories = useMemo(() => ["Men", "Women", "Kids"], []);
  const iconMap = {
    "Shoes": "footsteps-outline",
    "Clothings": "shirt-outline",
    "Accessories": "glasses-outline",
  };

  // Fetch Products by Category
  const fetchProductsByCategory = useCallback(async (category) => {
    try {
      const response = await axios.get(`${API_URL}/product/product/${category}`);
      if (response.status === 200) {
        // Extract Subcategories
        const subCategoryNames = Array.from(new Set(
          response.data.results.map(product => product.category?.sub_category?.name)
        )).filter(Boolean);

        // Format Product Data
        const formattedProducts = response.data.results.map(product => ({
          name: product.productName,
          price: product.color_size_combinations[0]?.size?.price || 0,
          image: product.images[0]?.image.startsWith('http') ? product.images[0].image : `${API_URL}${product.images[0]?.image}`,
          description: product.description || []
        }));

        // Group Products by Category
        const productsByCategory = response.data.results.reduce((acc, product) => {
          const categoryName = product.category?.name || "Unknown Category";
          acc[categoryName] = acc[categoryName] || [];
          acc[categoryName].push({
            name: product.productName,
            price: product.color_size_combinations[0]?.size?.price || 0,
            image: product.images[0]?.image,
            description: product.description || []
          });
          return acc;
        }, {});

        setSubCategories(subCategoryNames);
        setNewArrivals(formattedProducts);
        setProductDataByCategory(productsByCategory);
      }
    } catch (error) {
      console.error('Failed to fetch products by category', error);
    }
  }, []);

  // Fetch products when the selected category changes
  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [fetchProductsByCategory, selectedCategory]);

  // Handle Category Change
  const handleCategoryChange = (category) => setSelectedCategory(category);

  return (
    <ScrollView bg="#fff">
      {/* Category Selection */}
      <HStack justifyContent="flex-start" ml={3} space={5} bg="#f8f8f8" py={1}>
        {mainCategories.map((category) => (
          <TouchableOpacity key={category} onPress={() => handleCategoryChange(category)}>
            <Text
              fontSize="sm"
              bold={selectedCategory === category}
              color={selectedCategory === category ? "blue.500" : "gray.500"}
              underline={selectedCategory === category}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </HStack>

      {/* Banner */}
      <Banner />

      {/* Subcategories */}
      <VStack space={4} mt={5}>
        {subCategories.map((subcategory, idx) => (
          <HStack key={idx} justifyContent="space-between" alignItems="center" px={4} mt={1}>
            <HStack alignItems="center">
              <Icon
                name={iconMap[subcategory] || "help-circle-outline"}
                size={15}
                color="black"
              />
              <Text ml={5}>{subcategory}</Text>
            </HStack>
            <Icon
              name="arrow-forward"
              size={24}
              color="black"
              onPress={() => navigation.navigate(
                'PRODUCTACCESORIES',
                {
                  cargory_name: subcategory,
                }
              )}
            />
          </HStack>
        ))}
        <Divider />
      </VStack>

      {/* Product Sections */}
      <VStack mt={8} px={7}>
        <ProductSection title={`${selectedCategory} - New Arrivals`} products={newArrivals} />
        <ProductSection title="Recently Viewed Items" products={newArrivals} />
        {Object.entries(productDataByCategory).map(([categoryName, products], idx) => (
          <ProductSection key={idx} title={categoryName} products={products} />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default HomeScreen;
