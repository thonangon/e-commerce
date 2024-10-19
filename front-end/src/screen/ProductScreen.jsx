import React, { useState } from 'react';
import { ScrollView, Image } from 'native-base';
import { Box, Text, VStack, HStack, Divider, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ShoesScreen = () => {
  const navigation = useNavigation();
  const [showOptionModal, setShowOptionModal] = useState(false); // Modal state

  const shoes= [
    { id: 1, name: 'SANDALS & SLIDES', image: require('../assets/images/Soccer/white/F50_League_Multi-Ground_Soccer_Cleats_White_IE0604_03_standard.jpeg') },
    { id: 2, name: 'WORKOUT & GYM', image: require('../assets/images/Soccer/white/F50_League_Multi-Ground_Soccer_Cleats_White_IE0604_03_standard.jpeg') },
    { id: 3, name: 'HIKING', image: require('../assets/images/Soccer/black/Copa_Gloro_II_Firm_Ground_Soccer_Cleats_Black_IG8740_02_standard.jpeg') },
    { id: 4, name: 'OUTDOOR', image: require('../assets/images/Soccer/red/F50_League_Multi-Ground_Soccer_Cleats_White_IE0601_02_standard.jpeg') },
    { id: 5, name: 'GOLF', image: require('../assets/images/Soccer/white/F50_League_Multi-Ground_Soccer_Cleats_White_IE0604_03_standard.jpeg') },
    { id: 6, name: 'TENNIS', image: require('../assets/images/Running/white/Duramo_Speed_Shoes_White_IF1205_03_standard.jpeg') },
    { id: 7, name: 'SKATEBOARDING', image: require('../assets/images/Running/white/Duramo_Speed_Shoes_White_IF1205_03_standard.jpeg') },
    { id: 8, name: 'MOUNTAIN BIKING', image: require('../assets/images/Running/black/Ultraboost_5X_Shoes_Black_JI1332_HM7.jpeg') },
  ];

  const handleCheckIn = () => {
    navigation.goBack(); // Fixed navigation back
  };

  return (
    <VStack space={4} p={4} w="100%" maxW="400px" mx="auto">
      <HStack alignItems="center" space={40}>
        <Icon name="chevron-back-outline" size={23} color="black" onPress={handleCheckIn} />
        <Text bold fontSize={16}>SHOES</Text>
      </HStack>
      <ScrollView>
        <Box flex="1" bg="#03A1AB" mt={2}>
            {shoes.map((item, id) => (
            <VStack key={id}>
                <Box bg="white">
                    <HStack flex="1" justifyContent="space-between">
                        <Image
                            source={item.image}
                            alt={item.name}
                            style={{ width: 150, height: 150 }}
                            />
                        <Text >{item.name}</Text>
                        <IconButton 
                            onPress={() => setShowOptionModal(true)} 
                            icon={<Icon name="chevron-forward-outline" size={20} color="black" />}
                            />
                    </HStack>
                </Box>
                <Divider />
            </VStack>
            ))}
        </Box>
      </ScrollView>
    </VStack>
  );
};
export default ShoesScreen;
