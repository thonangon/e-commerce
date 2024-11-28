import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AppNavbar from './src/Navigation/AppNavbar';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/redux';
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_KEY ='pk_test_51PZ1M92KMJfWGuxDbOviEzE7eldlNfD2vLtPaweyyJPTAJEmEy7APiGipQYtve6F0MNP4iJTAxK15MAS9R25DRyG00GuyPPGZh';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <StripeProvider publishableKey={STRIPE_KEY}>
            <NavigationContainer>
              <AppNavbar />
            </NavigationContainer>
          </StripeProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
