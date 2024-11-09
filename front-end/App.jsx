import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AppNavbar from './src/Navigation/AppNavbar';
import {NativeBaseProvider} from 'native-base';
import { Provider } from 'react-redux';
import store from './src/store/redux';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavbar></AppNavbar>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;


