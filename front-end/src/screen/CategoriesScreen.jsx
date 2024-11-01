import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Image } from 'react-native';
import { Box, Text, VStack, HStack, Divider, IconButton,Select } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProductSection from '../components/product/productSection';
import axios from 'axios';
import { API_URL } from '../config/index';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [productDataByCategory, setProductDataByCategory] = useState({});
  const [arriveLists, setArriveLists] = useState([]);
  const [recentlyView, setRecentlyView] = useState([]);
  const categories = [
    { name: 'SHOES', icon: 'footsteps-outline' },
    { name: 'CLOTHING', icon: 'shirt-outline' },
    { name: 'ACCESSORIES', icon: 'glasses-outline' },
  ];
  const  fetchProductArrivals = useCallback(async() =>{
    try {
      const productlists = await axios.get(`${API_URL}/product/products`);
      if (productlists.status === 200){
        const formattedProducts = response.data.results.map(product => ({
          name: product.productName,
          price: product.color_size_combinations[0]?.size?.price || 0,
          image: product.images[0]?.image,
        }));
        setArriveLists(formattedProducts)
      }      
    }catch(err) {
      console.error('Failed to fetch product list', err);
    }
  })
  const fetchByMainCategory = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/product/product/{main_category_name}`);
      if (response.status === 200) {
       
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
          });
        });
        setProductDataByCategory(productsByCategory);
      }
      
    } catch (err) {
      console.error('Failed to fetch arrivals', err);
    }
  }, []);

  useEffect(() => {
    fetchProductArrivals();
    fetchByMainCategory();
  }, [fetchProductArrivals],[fetchByMainCategory]);

  const handleShoes = (category) => {
    navigation.navigate('PRODUCTSHOES');
  };

  return (
    <ScrollView bg="#fff">
      <HStack>
        <Select>
          <Select.Item className="item" >Men</Select.Item>
          <Select.Item  className="item" >Women</Select.Item>
          <Select.Item className="item" >Kids</Select.Item>
        </Select>
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
        {categories.map((category, idx) => (
          <HStack key={idx} justifyContent="space-between" alignItems="center" px={4} mt={1}>
            <HStack alignItems="center">
              <IconButton
                icon={<Icon name={category.icon} size={15} color="black" />}
              />
              <Text ml={2}>{category.name}</Text>
            </HStack>
            <Icon name="arrow-forward" size={24} color="black" onPress={() => handleShoes(category.name)} />
          </HStack>
        ))}
        <Divider />
      </VStack>
      <VStack mt={8} px={7}>
        <ProductSection title="NEW ARRIVALS" products={arriveLists} />
        <ProductSection title="RECENTLY VIEWED ITEMS" products={arriveLists} />
        {Object.entries(productDataByCategory).map(([categoryName, products], idx) => (
          <ProductSection key={idx} title={categoryName} products={products} />
        ))}
      </VStack>
    </ScrollView>
  );
};
export default HomeScreen;
