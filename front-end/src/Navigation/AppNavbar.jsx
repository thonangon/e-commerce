import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../features/LoginScreen';
import SignupScreen from '../features/SignupScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import HomePage from '../screen/HomePage';
import CarouselCard from '../components/CarouselComponent';
import CheckIn from '../features/CheckIn';
import ChangePassword from '../features/ChangPassword';
import Account from '../features/Account';
import Categories from '../screen/CategoriesScreen';
import SoppingChart from '../screen/ChatScreen';
import FavoriteScreen from '../screen/FavoriteScreen';
import AddressDelivery from '../screen/AddressScreen';
import PlaceOrder from '../screen/PlaceOrderScreen';
import ProductScreen from '../screen/ProductScreen';
import ProductDetail from '../screen/ProductDetail';
import Tabs from './tabBar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'WELCOME'} component={WelcomeScreen} />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={({navigation}) => ({
          headerLeft: accountUser ? () => <Text></Text> : null,
          headerRight: () => (
            <View style={styles.headerButtons}>
              (
              <>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => navigation.navigate('ProfileScreen')}>
                  <MaterialIcons
                    style={{marginTop: 13}}
                    name="person"
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={logout}>
                  <MaterialIcons
                    style={{marginTop: 13}}
                    name="logout"
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </>
              )
            </View>
          ),
        })}
      />

      <Stack.Screen name={'HOMEPAGE'} component={HomePage}  options={{ headerShown: false }} />
      <Stack.Screen name={'LOGIN'} component={LoginScreen} />
      <Stack.Screen name="SIGNUP" component={SignupScreen} />
      <Stack.Screen name="CAROUSEL" component={CarouselCard} />
      <Stack.Screen name="CHECKIN" component={CheckIn} />
      <Stack.Screen name="CHANGEPASSWORD" component={ChangePassword} />
      <Stack.Screen name="ACCOUNT" component={Account} />
      <Stack.Screen name="CATEGORIES" component={Categories}  options={{ headerShown: false }}/>
      <Stack.Screen name="CHART" component={SoppingChart} />
      <Stack.Screen name="FAVORITE" component={FavoriteScreen} />
      <Stack.Screen name="ADDRESS" component={AddressDelivery} />
      <Stack.Screen name="PLACEORDER" component={PlaceOrder} />
      <Stack.Screen name="PRODUCTSHOES" component={ProductScreen} />
      <Stack.Screen name="PRODUCTSOCKER" component={ProductDetail} />
    </Stack.Navigator>
  );
}
export default App;
const styles = StyleSheet.create({});
