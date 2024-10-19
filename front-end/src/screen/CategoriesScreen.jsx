import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Box, Text, VStack, HStack, Heading, Button, Divider, IconButton } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Product Card Component
const ProductCard = ({ image, name, price, code }) => (
  <Box bg="white" rounded="md" shadow={2} width={250}>
    <Image source={image} alt={name} style={{ height: 350, width: '100%' }} />
    <Box  position="absolute" top={220} left={3}  fontSize="sm">
      <Text fontSize="md" bg="#fff" color="gray.400">CODE: {code}</Text>
      <Text fontSize="md" bg="#fff" mt={1} mb={4}>${price}</Text>
      <Text fontSize="sm" bold>{name}</Text>
      <Text fontSize="xs" color="gray.500">Men's Soccer</Text>
    </Box>
  </Box>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const categories = [
    { name: 'SHOES', icon: 'footsteps-outline' }, 
    { name: 'CLOTHING', icon: 'shirt-outline' }, 
    { name: 'ACCESSORIES', icon: 'glasses-outline' }, 
  ];
  const products = [
    { name: 'MESSI F50 PRO FIRM GROUND SOCCER CLEATS', price: 160, code: 'SAVINGS', image: require('../assets/running1.png') },
    { name: 'MESSI F50 PRO FIRM GROUND SOCCER CLEATS', price: 160, code: 'SAVINGS', image: require('../assets/running2.png') },
  ];
  const handleShoes = (category) => {
    navigation.navigate('PRODUCTSHOES');
    // if (category[0] === 0) {
    // }
  }
  return (
    <ScrollView bg="#fff">
      {/* Header Section */}
      <Text ml={3}>BACK TO SCHOOL</Text>
      <Box>
        <Image
          source={require('../assets/category_page.png')}
          alt="Back to School"
          style={{ width: '100%', height: 230 }}
        />
        <Text position="absolute" top={140} left={3} fontSize="sm" bg="white" px={2} bold>
          SAVE ON BACK TO SCHOOL
        </Text>
        <Text position="absolute" top={170} left={3} bg="white" px={2}>
          30% off full price and sale. Use code: KIDS
        </Text>
      </Box>
      {/* Category Section */}
      <VStack space={4} mt={5}>
        {categories.map((category, idx) => (
          <HStack key={idx} justifyContent="space-between" alignItems="center" px={4} mt={1} >
            <HStack alignItems="center">
              <IconButton
                icon={<Icon name={category.icon} size={15} color="black" />}
                />
              <Text ml={2}>{category.name}</Text>
            </HStack>
            <Icon name="arrow-forward" size={24} color="black" onPress={handleShoes} />
          </HStack>
        ))}
        <Divider></Divider>
      </VStack>
      {/* Product Sections */}
      <VStack mt={8} px={7}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md">NEW ARRIVALS</Heading>
          <Button size="sm">
            <HStack>
              <Text >SEE ALL</Text>
              <Icon name="arrow-forward" size={17} color="#00C2C2" />
            </HStack>
          </Button>
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </ScrollView>

        <Divider my={5} />

        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md">BEST SELLERS</Heading>
          <Button size="sm">
            <HStack>
              <Text >SEE ALL</Text>
              <Icon name="arrow-forward" size={17} color="#00C2C2" />
            </HStack>
          </Button>
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </ScrollView>

        <Divider my={5} />

        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md">RUNNING</Heading>
          <Button size="sm">
            <HStack>
              <Text >SEE ALL</Text>
              <Icon name="arrow-forward" size={17} color="#00C2C2" />
            </HStack>
          </Button>
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </ScrollView>
        <Divider my={5} />
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md">WALKING</Heading>
          <Button size="sm">
            <HStack>
              <Text >SEE ALL</Text>
              <Icon name="arrow-forward" size={17} color="#00C2C2" />
            </HStack>
          </Button>
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </ScrollView>
      </VStack>
    </ScrollView>
  );
};
export default HomeScreen;
