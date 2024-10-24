import React, { useState, useEffect } from 'react';
import { Image, Dimensions } from 'react-native';
import { Box, Button, Center, Divider, HStack, ScrollView, Text, VStack, Select } from 'native-base';
import axios from '../../api/axios'; // Use custom axios instance

const HomeScreen = () => {
  const [selected, setSelected] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios.get('/category/main-categories/')
      .then((res) => {
        setCategoryList(res.data); // Assuming res.data is an array of categories
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCategorySelect = (category) => {
    setSelected(category);
    console.log(`Selected Category: ${category}`);
  };

  const data = [
    { key: '1', image: require('../assets/img-home.png') },
    { key: '2', image: require('../assets/home1.png') },
    // Additional images...
  ];

  const screenHeight = Dimensions.get('window').height;

  return (
    <Box flex={1} bg="#F5F5F5">
      <Divider mx={4} />
      
      {/* Horizontal Scroll for Category Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
        <Box pt={1} px={4}>
          <HStack mt={1} space={2} alignItems="center">
            <VStack>
              <Select
                selectedValue={selected}
                minWidth="200"
                height="30px"
                placeholder="Select Category"
                _selectedItem={{
                  bg: "cyan.600",
                  // endIcon: <Icon name="checkmark-outline" size={16} color="white" />,
                }}
                onValueChange={(itemValue) => setSelected(itemValue)}
                // dropdownIcon={<Icon name="chevron-down-outline" size={16} color="black" />}
              >
                {categoryList.map((category, index) => (
                  <Select.Item key={index} label={category.name} value={category.name} />
                ))}
              </Select>
            </VStack>

            <HStack space={2}>
              {categoryList.map((category, index) => (
                <Button
                  key={index}
                  py={1}
                  variant={category.name === selected ? 'outline' : 'solid'}
                  bg={category.name === selected ? '#00F0FF' : 'white'}
                  _text={{ color: 'black' }}
                  onPress={() => handleCategorySelect(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </HStack>
          </HStack>
        </Box>
      </ScrollView>

      {/* Image Gallery */}
      <ScrollView>
        <Center>
          {data.map((item, index) => (
            <Image
              key={index}
              source={item.image}
              style={{ width: "100%", height: screenHeight, resizeMode: 'cover' }}
            />
          ))}
          <Text position="absolute" top="1%" left="5%" bg="white" px={2} fontSize="sm" color="#00C2C2">
            SOCCER
          </Text>
        </Center>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
