import React, { useState, useEffect } from 'react';
import { VStack, HStack, Text, ScrollView, Box, Image, IconButton, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import colors from '../../utils/colors';

const AccesariesScreen = () => {
  const navigation = useNavigation();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/category/sub-categories/');
        const filteredSubcategories = response.data.results.filter((subcategory) =>
          subcategory.name.toLowerCase() === 'accessories'
        );
        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleCheckIn = () => {
    navigation.goBack();
  };

  const handleNavigation = (categoryId, categoryName) => {
    navigation.navigate('PRODUCTSOCKER', { id: categoryId, name: categoryName });
  };

  return (
    <VStack space={4} p={4} w="100%" maxW="400px" mx="auto" bg="white">
      <HStack alignItems="center" space={20} mb={4}>
        <Icon name="chevron-back-outline" size={24} color="black" onPress={handleCheckIn} />
        <Text bold fontSize={18} color="black">Accessories</Text>
      </HStack>
      <ScrollView>
        {subcategories.map((Accessories) => (
          <Box key={Accessories.id} flex="1" mt={2} p={4}>
            {Accessories.categories.map((category) => (
              <VStack key={category.id} mb={4}>
                <HStack
                  bg="white"
                  p={3}
                  borderRadius="8"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <HStack alignItems="center" space={3}>
                    <Image
                      source={category.image ? { uri: `http://10.0.2.2:8000${category.image}` } : require('../../assets/fav1.png')}
                      alt={category.name}
                      style={{ width: 60, height: 60, borderRadius: 8 }}
                    />
                    <Text fontSize={16} color="black" bold>{category.name}</Text>
                    <Text fontSize={16} color="black" bold>{category.name}</Text>
                    
                  </HStack>
                  <IconButton
                    onPress={() => navigation.navigate('PRODUCTSOCKER')}
                    icon={<Icon name="chevron-forward-outline" size={20} color="black" />}
                  />
                </HStack>
                <Divider mt={3} />
              </VStack>
            ))}
          </Box>
        ))}
      </ScrollView>
    </VStack>
  );
};

export default AccesariesScreen;