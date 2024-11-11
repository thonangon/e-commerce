import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Divider } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProductSection from '../components/product/productSection';
import axios from 'axios';
import { API_URL } from '../config/index';
import Banner from '../components/SoccerMen/Banner';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [productDataByCategory, setProductDataByCategory] = useState({});
  const [arriveLists, setArriveLists] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const mainCategories = useMemo(() => ["Men", "Women", "Kids"], []);

  const iconMap = {
    "Shoes": "footsteps-outline",
    "Clothings": "shirt-outline",
    "Accessories": "glasses-outline",
  };

  const fetchByMainCategory = useCallback(async (category) => {
    try {
      const response = await axios.get(`${API_URL}/product/product/${category}`);
      if (response.status === 200) {
        const subCategoryNames = Array.from(
          new Set(
            response.data.results.map(product => product.category?.sub_category?.name)
          )
        ).filter(Boolean);

        const subCategoryItems = response.data.results.flatMap(product => {
          if (product.category?.sub_category) {
            return {
              subCategoryId: product.category.sub_category.id,
              subCategoryName: product.category.sub_category.name,
              categories: product.category.sub_category.categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                image: cat.image ? `${API_URL}${cat.image.replace('http://127.0.0.1:8000', 'http://10.0.2.2:8000')}` : ''
              }))
            };
          }
          return [];
        });

        const uniqueSubCategoryItems = Array.from(
          new Map(subCategoryItems.map(item => [item.subCategoryId, item])).values()
        );

        const formattedProducts = response.data.results.map(product => ({
          category: product.category?.name,
          name: product.productName,
          price: product.color_size_combinations[0]?.size?.price || 0,
          image: product.images[0]?.image.startsWith('http') ? product.images[0].image : `${API_URL}${product.images[0]?.image}`,
          description: product.description || []
        }));
        // console.log('werty',formattedProducts);

        const productsByCategory = {};
        response.data.results.forEach(product => {
          const categoryName = product.category?.name || "Unknown Category";
          if (!productsByCategory[categoryName]) {
            productsByCategory[categoryName] = [];
          }
          productsByCategory[categoryName].push({
            name: product.productName,
            price: product.color_size_combinations[0]?.size?.price || 0,
            image: product.images[0]?.image,
            description: product.description || [],
            discount: product.discount,
          });
        });

        setSubCategories(subCategoryNames);
        setArriveLists(formattedProducts);
        setProductDataByCategory(productsByCategory);
        setSubCategoryItems(uniqueSubCategoryItems);
      }
    } catch (err) {
      console.error('Failed to fetch products by category', err);
    }
  }, []);

  useEffect(() => {
    fetchByMainCategory(selectedCategory);
  }, [fetchByMainCategory, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };



  return (
    <ScrollView bg="#fff">
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
      <Banner />

      <VStack space={4} mt={5}>
        {subCategories.map((subcategory, idx) => (
          <HStack key={idx} justifyContent="space-between" alignItems="center" px={4} mt={1}>
            <HStack alignItems="center">
              <Icon
                name={iconMap[subcategory] || "help-circle-outline"} // Fallback icon if not found
                size={15}
                color="black"
              />
              <Text ml={5}>{subcategory}</Text>
            </HStack>
            <Icon
              name="arrow-forward"
              size={24}
              color="black"
              onPress={() => {
                const subCategoryData = subCategoryItems.filter(item => item.subCategoryName === subcategory);
                navigation.navigate('PRODUCTSHOES', {
                  items: subCategoryData,
                  formattedProducts: arriveLists
                });
              }}
            />

          </HStack>
        ))}
        <Divider />
      </VStack>

      <VStack mt={8} px={7}>
        <ProductSection title={`${selectedCategory} - New Arrivals`} products={arriveLists} />
        <ProductSection title="RECENTLY VIEWED ITEMS" products={arriveLists} />
        {Object.entries(productDataByCategory).map(([categoryName, products], idx) => (
          <ProductSection key={idx} title={categoryName} products={products} />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default HomeScreen;
