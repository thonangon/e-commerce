import React, { useState, useEffect, useCallback ,useMemo } from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Divider } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProductSection from '../components/product/productSection';
import axios from 'axios';
import { API_URL } from '../config/index';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [productDataByCategory, setProductDataByCategory] = useState({});
  const [arriveLists, setArriveLists] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [subCategories, setSubCategories] = useState([]);
  // const mainCategories = ["Men", "Women", "Kids"];
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

        response.data.results.forEach(product => {
          const subCategoryName = product.category?.sub_category?.name;
          const shoeItems = product.category?.sub_category?.categories?.map(category => category.name) || []; // Map over categories to get each name

          console.log(`Subcategory: ${subCategoryName}, Categories: ${shoeItems.join(', ')}`);
        });

        const formattedProducts = response.data.results.map(product => ({
          name: product.productName,
          price: product.color_size_combinations[0]?.size?.price || 0,
          image: product.images[0]?.image.startsWith('http') ? product.images[0].image : `${API_URL}${product.images[0]?.image}`,
          description: product.description || []
        }));
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
            description: product.description || []
          });
        });

        setSubCategories(subCategoryNames);
        setArriveLists(formattedProducts);
        setProductDataByCategory(productsByCategory);
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
      <Box>
        <Image
          source={require('../assets/category_page.png')}
          alt="Back to School"
          style={{ width: '100%', height: 230 }}
        />
        <Text position="absolute" top={140} left={3} fontSize="sm" bg="white" px={2} bold>
          SAVE ON BACK TO SCHOOL
        </Text>
        <Text position="absolute" top={170} left={3} bg="white" px={2}>
          30% off full price and sale. Use code: KIDS
        </Text>
      </Box>
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
                if (subcategory === "Shoes") {
                  navigation.navigate('PRODUCTSHOES');
                } else if (subcategory === "Clothings") { // Ensure it matches the key in iconMap
                  navigation.navigate('PRODUCTCLOTHING');
                } else if (subcategory === "Accessories") {
                  navigation.navigate('PRODUCTACCESORIES');
                } else {
                  navigation.navigate('DEFAULT_SCREEN'); // Optional: A fallback screen
                }
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
