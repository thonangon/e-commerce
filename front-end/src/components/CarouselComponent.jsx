import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { API_URL } from '../config/index';

const { width } = Dimensions.get('window');

const ActionImageCarousel = () => {
  const navigation = useNavigation(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/media/media_upload/`);
      if (response.status === 200) {
        const fetchedImages = response.data.data.map((item) => ({
          id: item.media_id,
          source: { uri: item.image.startsWith('http') ? item.image : `${API_URL}${item.image}` }
        }));
        setImages(fetchedImages);
      } else {
        console.error("Failed to fetch images, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (images.length > 0 ? (prevIndex + 1) % images.length : 0));
    }, 1800); // Change image every 1.8 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        {images.length > 0 ? (
          <Image source={images[currentIndex].source} style={styles.image} />
        ) : (
          <Text>Loading images...</Text>
        )}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: 600,
  },
  actionContainer: {
    flexDirection: 'column',
    alignItems: 'center',	
    marginVertical: 20,
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
