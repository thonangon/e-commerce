import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppNavbar from './src/Navigation/AppNavbar';
import {NativeBaseProvider} from 'native-base'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppNavbar></AppNavbar>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
