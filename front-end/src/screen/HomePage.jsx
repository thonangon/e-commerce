import React, { useState } from 'react';
import { Image, TouchableOpacity, ImageBackground, View } from 'react-native';
import { Box, Button, Divider, Modal, HStack, IconButton, ScrollView, VStack, Select, Text } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import categories from './CategoriesScreen';
import Chart from './ChatScreen';
import FavoriteScreen from './FavoriteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from "../utils/colors";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [isModalVisible, setModalVisible] = useState(true);

  const data = [
    { key: '1', image: require('../assets/img-home.png'), Title: 'SOCKER' },
    { key: '2', image: require('../assets/home1.png'), Title: 'RUNNING' },
    { key: '3', image: require('../assets/home3.png'), Title: 'SNEAKER' },
    { key: '4', image: require('../assets/home4.png'), Title: 'WALKING' },
    { key: '5', image: require('../assets/home5.png'), Title: 'BAG' },
    { key: '6', image: require('../assets/home6.png'), Title: 'ADIDAS' },
    { key: '7', image: require('../assets/home7.png'), Title: 'SHOESE' },
    { key: '8', image: require('../assets/home8.png'), Title: 'JEAN' },
    { key: '9', image: require('../assets/home9.png'), Title: 'T-SHIRT' },
  ];

  const categories = ['Soccer', 'Running', 'Sneakers', 'Walking'];

  const handleCategorySelect = (category) => {
    console.log(`${category} clicked`);
  };

  return (
    <Box flex={1} bg={colors.bg_home}>
      <Divider mx={4} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
        <Box bg={colors.bg_home} pt={1} px={4}  marginBottom={3}>
          <HStack mt={1} justifyContent="space-between" alignItems="center" space={2}>
            <VStack>
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
                _text={{ color: 'black' }}
                onPress={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            ))}
          </HStack>
        </Box>
      </ScrollView>

      <ScrollView>
        {data.map((item, index) => (
          <ImageBackground
            key={index}
            source={item.image}
            style={{ width: "100%", height: 670, resizeMode: 'cover' }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 70 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                {item.Title}
              </Text>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.bg_button,
                  padding: 10,
                  borderRadius: 5
                }}
                onPress={() => navigation.navigate('CATEGORIES')}
              >
                <Text
                  style={{
                    color: '#fff',
                    width: '80%',
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5
                  }}
                >
                  SHOP NOW
                </Text>
                <IconButton
                  onPress={() => setShowOptionModal(true)}
                  icon={<Icon name="arrow-forward" size={20} color="black" />}
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>

            </View>


          </ImageBackground>
        ))}
        {/* Promotional Popup Modal */}
        <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
          <Image
            source={require('../assets/promotions.png')}
            alt="Promotional Card"
            resizeMode="cover"
            height="200px"
          />
          <Modal.CloseButton />
        </Modal>
      </ScrollView>

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
