import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Image, TouchableOpacity, ImageBackground, View} from 'react-native';
import { Box, Button, Divider, Modal, HStack, IconButton, ScrollView, VStack, Select, Text } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import categories from './CategoriesScreen';
import Chart from './ChatScreen';
import FavoriteScreen from './FavoriteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from "../utils/colors";
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalVisible, setModalVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const scrollViewRef = useRef(null); 

  const fetchMainCategories = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/category/main-categories/');
      setCategories(response.data.results || []);
    } catch (error) {
      console.error("Error fetching main categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchMainCategories();
  }, [fetchMainCategories]);

  const handleCategorySelect = (itemValue) => {
    setSelectedCategory(itemValue);
  };

  const scrollToCategory = (categoryName) => {
    if (scrollViewRef.current) {
      const categoryIndex = categories.filter(mainCategory =>
        mainCategory.subcategories.some(subcategory =>
          subcategory.categories.some(category => category.name === categoryName)
        )
      );

      if (categoryIndex !== -1) {
        const categoryPosition = categoryIndex * 670;
        scrollViewRef.current.scrollTo({ y: categoryPosition, animated: true });
      }
    }
  };

  return (
    <Box flex={1} bg={colors.bg_home}>
      <Divider mx={4} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
        <Box pt={1} px={4} py={4}>
          <HStack mt={1} justifyContent="space-between" alignItems="center" space={2}>
            <VStack>
              <Select
                selectedValue={selectedCategory}
                placeholder="Select Category"
                onValueChange={handleCategorySelect}
                dropdownIcon={<Icon name="chevron-down-outline" size={16} color="black" />}
                variant="filled"
                py={0.5}
                width={20}
              >
                {categories.length > 0 ? categories.map((category) => (
                  <Select.Item key={category.id} label={category.name} value={category.id.toString()} />
                )) : <Select.Item label="No categories available" value="" />}
              </Select>
            </VStack>

            <HStack space={4}>
              {categories.map((mainCategory) => (
                <HStack key={mainCategory.id} space={2}>
                  {mainCategory.subcategories?.map((subcategory) => (
                    subcategory.categories?.map((category) => (
                      <Button
                        key={category.id}
                        py={1}
                        variant="outline"
                        bg={category.name === "SOCCER" ? 'black.100' : 'white'}
                        _text={{ color: category.name === "SOCCER" ? "white" : "black" }}
                        onPress={() => {
                          scrollToCategory(category.name); 
                          console.log("Category selected:", category.name);
                        }}
                      >
                        {category.name}
                      </Button>
                    ))
                  ))}
                </HStack>
              ))}
            </HStack>
          </HStack>
        </Box>
      </ScrollView>

      <ScrollView ref={scrollViewRef}>
        {categories.map((mainCategory) => (
          <View key={mainCategory.id}>
            {mainCategory.subcategories?.map((subcategory) => (
              <View key={subcategory.id}>
                {subcategory.categories?.map((category) => {
                  const baseURL = 'http://10.0.2.2:8000';
                  const imageUrl = category.image ? `${baseURL}${category.image}` : null;

                  return (
                    <ImageBackground
                      key={category.id}
                      source={imageUrl ? { uri: imageUrl } : require('../assets/fav2.png')}
                      style={{ width: '100%', height: 670 }}
                    >
                      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 70 }}>
                        <Text
                          style={{
                            position: 'absolute',
                            top: '1%',
                            left: '5%',
                            backgroundColor: 'white',
                            padding: 4,
                            fontSize: 16,
                            color: '#00C2C2',
                          }}
                        >
                          {category.name}
                        </Text>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            margin: 20,
                            width: '90%',
                            alignItems: 'center',
                            backgroundColor: colors.bg_button,
                            padding: 10,
                            borderRadius: 5
                          }}
                          onPress={() => navigation.navigate('CATEGORIES')}
                        >
                          <Text style={{ color: '#fff' }}>SHOP NOW</Text>
                          <IconButton icon={<Icon name="arrow-forward" size={20} color="white" />} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  );
                })}
              </View>
            ))}
          </View>
        ))}

        <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
          <Image source={require('../assets/promotions.png')} alt="Promotional Card" resizeMode="cover" height="200px" />
          <Modal.CloseButton />
        </Modal>
      </ScrollView>
    </Box>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  const navigation = useNavigation();

  const handleSignup = () => navigation.navigate('CAROUSEL');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Categories':
              iconName = 'list-outline';
              break;
            case 'Cart':
              iconName = 'cart-outline';
              break;
            case 'Favorites':
              iconName = 'heart-outline';
              break;
            default:
              iconName = 'home-outline';
          }
          return <Icon name={iconName} size={22} color="#fff" />;
        },
        tabBarActiveTintColor: colors.bg_button,
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: colors.bg_button },
      })}>
      <Tab.Screen
        name="Home"
        options={{
          headerTitle: "HELLO",
          headerStyle: { backgroundColor: colors.bg_home },
          headerTintColor: '#fff',
          headerRight: () => (
            <IconButton
              icon={<Icon name="person-outline" size={24} color="#fff" />}
              onPress={handleSignup}
            />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen name="Categories" options={{
        headerTitle: "SHOP",
        headerStyle: { backgroundColor: '#03A1AB' },
        headerRight: () => (
          <IconButton
            icon={<Icon name="search-outline" size={24} color="#fff" />}
          />
        ),
      }} component={categories} />
      <Tab.Screen name="Cart" options={{
        headerTitle: "SHOPPING BAG",
        headerStyle: { backgroundColor: '#03A1AB' },
      }} component={Chart} />
      <Tab.Screen name="Favorites" options={{
        headerTitle: "FAVORITE",
        headerStyle: { backgroundColor: '#03A1AB' },
      }} component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default App;
