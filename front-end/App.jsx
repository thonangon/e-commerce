import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AppNavbar from './src/Navigation/AppNavbar';
import {NativeBaseProvider} from 'native-base'
import { AuthProvider } from './src/store/redux';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavbar></AppNavbar>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
};

export default App;


