import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Image, TouchableOpacity, ImageBackground, View, ScrollView as RNScrollView,
} from 'react-native';
import {
  Box, Button, Divider, Modal, HStack, IconButton, VStack, Select, Text,
} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import categoriesData from './CategoriesScreen';
import Chart from './ChatScreen';
import FavoriteScreen from './FavoriteScreen';
import { colors } from "../utils/colors";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalVisible, setModalVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const scrollViewRef = useRef(null);
  const categoryOffsets = useRef({});
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);

  const fetchMainCategories = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/category/main-categories/');
      const categoriesData = response.data.results || [];
      setCategories(categoriesData);

      const menCategory = categoriesData.find((category) => category.name === "Men");
      if (menCategory) {
        setSelectedMainCategory(menCategory.id.toString());
      }
    } catch (error) {
      console.error("Error fetching main categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchMainCategories();
  }, [fetchMainCategories]);

  const setCategoryOffset = useCallback((categoryId, event) => {
    const offset = event.nativeEvent.layout.y;
    categoryOffsets.current[categoryId] = offset;
  }, []);

  const scrollToCategory = (categoryId) => {
    const offset = categoryOffsets.current[categoryId];
    if (offset !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: offset, animated: true });
    }
  };

  return (
    <Box flex={1} bg={colors.bg_home}>
      <Divider mx={4} />
      <RNScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContainer}>
        <Box px={4} py={4}>
          <HStack mt={1} justifyContent="space-between" alignItems="center" space={2}>
            <VStack>
              <Select
                selectedValue={selectedMainCategory}
                placeholder="Select Main Category"
                onValueChange={setSelectedMainCategory}
                dropdownIcon={<Icon name="chevron-down-outline" size={16} color="black" />}
                variant="filled"
                width={150}
                py={1}
              >
                {categories.length > 0
                  ? categories.map((mainCategory) => (
                    <Select.Item key={mainCategory.id} label={mainCategory.name} value={mainCategory.id.toString()} />
                  ))
                  : <Select.Item label="No categories available" value="" />}
              </Select>
            </VStack>

            <HStack space={4}>
              {selectedMainCategory &&
                categories
                  .find((cat) => cat.id === parseInt(selectedMainCategory))
                  ?.subcategories?.flatMap((subcategory) =>
                    subcategory.categories?.map((category) => (
                      <Button
                        key={category.id}
                        py={1}
                        variant="outline"
                        bg={category.id === selectedCategory ? 'black.100' : 'white'}
                        _text={{ color: category.id === selectedCategory ? "white" : "black" }}
                        onPress={() => {
                          setSelectedCategory(category.id);
                          scrollToCategory(category.id);
                        }}
                      >
                        {category.name}
                      </Button>
                    ))
                  )}
            </HStack>
          </HStack>
        </Box>
      </RNScrollView>

      <RNScrollView ref={scrollViewRef}>
        {categories.map((mainCategory) => (
          mainCategory.subcategories?.map((subcategory) => (
            subcategory.categories?.map((category) => {
              const imageUrl = category.image ? `http://10.0.2.2:8000${category.image}` : null;
              return (
                <View key={category.id} onLayout={(event) => setCategoryOffset(category.id, event)}>
                  <ImageBackground source={imageUrl ? { uri: imageUrl } : require('../assets/fav2.png')} style={styles.imageBackground}>
                    <View style={styles.textContainer}>
                      <Text style={styles.categoryText}>{category.name}</Text>
                      <TouchableOpacity
                        style={styles.shopNowButton}
                        onPress={() => navigation.navigate('CATEGORIES')}
                      >
                        <Text style={styles.shopNowButtonText}>SHOP NOW</Text>
                        <IconButton icon={<Icon name="arrow-forward" size={20} color="white" />} style={{ marginLeft: 10 }} />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              );
            })
          ))
        ))}

        <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
          <Image source={require('../assets/promotions.png')} alt="Promotional Card" resizeMode="cover" height="200px" />
          <Modal.CloseButton />
        </Modal>
      </RNScrollView>
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
      })}
    >
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
      <Tab.Screen name="Categories" component={categoriesData} options={{ headerTitle: "SHOP", headerStyle: styles.headerStyle }} />
      <Tab.Screen name="Cart" component={Chart} options={{ headerTitle: "SHOPPING BAG", headerStyle: styles.headerStyle }} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} options={{ headerTitle: "FAVORITE", headerStyle: styles.headerStyle }} />
    </Tab.Navigator>
  );
};

const styles = {
  horizontalScrollContainer: { paddingVertical: 8 },
  imageBackground: { width: '100%', height: 670 },
  textContainer: { flex: 1, justifyContent: 'flex-end', paddingBottom: 70 },
  categoryText: {
    position: 'absolute',
    top: '1%',
    left: '5%',
    backgroundColor: 'white',
    padding: 4,
    fontSize: 16,
    color: '#00C2C2',
  },
  shopNowButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    width: '90%',
    alignItems: 'center',
    backgroundColor: colors.bg_button,
    padding: 10,
    borderRadius: 5,
  },
  shopNowButtonText: { color: '#fff' },
  headerStyle: { backgroundColor: '#03A1AB' },
};

export default App;
