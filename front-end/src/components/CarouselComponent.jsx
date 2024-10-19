import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const images = [
  { id: 1, source: require('../assets/0.png') }, 
  { id: 2, source: require('../assets/1.png') },
  { id: 3, source: require('../assets/2.png') },
  { id: 4, source: require('../assets/3.png') },
  { id: 5, source: require('../assets/4.png') },
];

const { width } = Dimensions.get('window'); 

const ActionImageCarousel = () => {
  const navigation = useNavigation(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSingup = () => {
    navigation.navigate('SIGNUP');
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
    }, 1800); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Image source={images[currentIndex].source} style={styles.image} />
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSingup}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonJoin}>
            <Text style={styles.buttonTextJoin}>JOIN THE CLUB</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: width , 
    height: 600,
  },
  actionContainer: {
    flexDirection: 'column',
    alignItems: 'center',	
    borderRadius: 5,

    
  },
  button: {
    width: width - 80,
    paddingVertical: 10,
 
    borderWidth: 0.1,
    borderRadius: 2,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  buttonJoin: {
    width: width - 80,
    paddingVertical: 10,
    backgroundColor: '#00D2C2',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonTextJoin: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ActionImageCarousel;
