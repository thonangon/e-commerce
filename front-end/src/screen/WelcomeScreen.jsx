import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
    const navigation = useNavigation();

    const HomePage = () => {
        navigation.navigate("HOMEPAGE");
    }
    return (
        <View style={styles.container}>
        <Image source={require('../../src/assets/online.png')} style={{ width: 150, height: 150 }}>
        </Image>
            <TouchableOpacity style={styles.button} onPress={HomePage}>
                <Text style={styles.buttonText}>Online Shop</Text>
            </TouchableOpacity>
        </View>
    )
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#03A1AB',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 20,
    },
    description:{
        fontSize: 16,
        color: '#8D6E63',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize:30,
        fontWeight: '600',
        textAlign: 'center',
        
    }
});
