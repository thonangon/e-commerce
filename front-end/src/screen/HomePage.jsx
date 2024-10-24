import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Button, Center, Divider, HStack, IconButton, ScrollView, Text, VStack, View, Select } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import categories from './CategoriesScreen';
import Chart from './ChatScreen';
import FavoriteScreen from './FavoriteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ButtonClick from '../components/Button';
import { colors } from "../utils/colors";
import axios from '../../api/axios';
const HomeScreen = () => {
  const [selected, setSelected] = useState('');
  const data = [
    { key: '1', image: require('../assets/img-home.png') },
    { key: '2', image: require('../assets/home1.png') },
    { key: '3', image: require('../assets/home3.png') },
    { key: '4', image: require('../assets/home4.png') },
    { key: '5', image: require('../assets/home5.png') },
    { key: '6', image: require('../assets/home6.png') },
    { key: '7', image: require('../assets/home7.png') },
    { key: '8', image: require('../assets/home8.png') },
    { key: '9', image: require('../assets/home9.png') },
  ];

  const categories = ['Soccer', 'Running', 'Sneakers', 'Walking'];

  const handleCategorySelect = (category) => {
    console.log(`${category} clicked`);
  };

  return (
    <Box flex={1} bg={colors.bg_home}>
      <Divider mx={4} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
        <Box bg={colors.bg_home} pt={1} px={4}>
          <HStack mt={1} justifyContent="space-between" alignItems="center" space={2}>
            <VStack >
              <Select
                selectedValue={selected}
                minWidth="15"
                height="30px"
                accessibilityLabel="Choose Category"
                placeholder="Men's"
                _selectedItem={{
                  bg: "cyan.600",
                  endIcon: <Icon name="checkmark-outline" size={16} color="white" />
                }}
                onValueChange={(itemValue) => setSelected(itemValue)}
                variant="filled"
                dropdownIcon={<Icon name="chevron-down-outline" size={16} color="black" />}
              >
                <Select.Item label="Men's" value="Men's" />
                <Select.Item label="Women's" value="Women's" />
                <Select.Item label="Kids" value="Kids" />
              </Select>
            </VStack>

            {/* Other Categories */}
            {categories.map((category, index) => (
              <Button
                key={index}
                py={1}
                variant={category === 'Soccer' ? 'outline' : 'solid'}
                bg={category === 'Soccer' ? '#00F0FF' : 'white'}
                _text={{ color: category === 'Soccer' ? 'black' : 'black' }}
                onPress={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </HStack>
        </Box>
      </ScrollView>

      <ScrollView>
        <Center>
          {data.map((item, index) => (
            <Image
              key={index}
              source={item.image}
              style={{ width: "100%", height: 670, resizeMode: 'cover' }}
            />
          ))}
          <Text position="absolute" top="1%" left="5%" bg="white" px={2} fontSize="sm" color={"#00C2C2"}>
            SOCCER
          </Text>
        </Center>
      </ScrollView>


      <ButtonClick color="#fff" bg={colors.bg_button} title="SHOP NOW"></ButtonClick>
    </Box>
  );
};
const Tab = createBottomTabNavigator();
const App = () => {
  const navigation = useNavigation();
  const handleSignup = () => {
    navigation.navigate('CAROUSEL');
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = 'list-outline';
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          }
          return <Icon name={iconName} size={22} color="#fff" />;
        },
        tabBarActiveTintColor: colors.bg_button,
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: colors.bg_button },
        stackStyle: { backgroundColor: colors.bg_button }
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
          tabBarStyle: { backgroundColor: '#007B82' },
        }}
        component={HomeScreen}
      />
      <Tab.Screen name="Categories" options={{
        headerTitle: "SHOP", headerStyle: { backgroundColor: '#03A1AB' }, headerRight: () => (
          <IconButton
            icon={<Icon name="search-outline" size={24} color="#fff" />}
          />
        ), tabBarStyle: { backgroundColor: '#007B82' },
      }} component={categories} />
      <Tab.Screen name="Cart" options={{ headerTitle: "SHOPPING BAGE", tabBarStyle: { backgroundColor: '#007B82' }, headerStyle: { backgroundColor: '#03A1AB' }, }} component={Chart} />
      <Tab.Screen name="Favorites" options={{ headerTitle: "FAVORITE", tabBarStyle: { backgroundColor: '#007B82' }, headerStyle: { backgroundColor: '#03A1AB' }, }} component={FavoriteScreen} />
    </Tab.Navigator>
  );
};
export default App;

