import React from 'react';
import { ScrollView as RNScrollView, Image as RNImage } from 'react-native';
import { Box, Text, VStack, HStack, IconButton, Image, ScrollView, } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
import colors from '../utils/colors';
const ProductCard = ({ image, name, price, code }) => (
    <Box bg="white" rounded="md" shadow={2} width={200} marginTop={1} position="relative">
        <Image source={image} alt={name} style={{ height: 350, width: '100%' }} />
        <IconButton
            icon={<Icon name="heart-outline" size={20} color="black" />}
            onPress={() => console.log('Favorite')}
            position="absolute"
            top={2}
            right={2}
            zIndex={1}
        />

        <Box position="absolute" top={220} left={3} fontSize="sm">
            <Text fontSize="md" bg="#fff" color="gray.400">CODE: {code}</Text>
            <Text fontSize="md" bg="#fff" mt={1} mb={4}>${price}</Text>
            <Text fontSize="sm" bold>{name}</Text>
            <Text fontSize="xs" color="gray.500">Men's Soccer</Text>
        </Box>
    </Box>

);
const HomeScreen = () => {
    const navigation = useNavigation();

    const products = [
        { name: 'MESSI F50 PRO FIRM GROUND SOCCER CLEATS', price: 160, code: 'SAVINGS', image: require('../assets/running1.png'), category: "Men's Soccer" },
        { name: 'MESSI F50 PRO FIRM GROUND SOCCER CLEATS', price: 160, code: 'SAVINGS', image: require('../assets/running2.png'), category: "Men's Soccer" },
    ];


    return (
        <RNScrollView>
            <HStack justifyContent="space-between" alignItems="center" px={3} py={2} bg="#00C2C2">
                <IconButton
                    icon={<Icon name="chevron-back" size={24} color="white" />}
                    onPress={() => navigation.goBack()}
                    variant="unstyled"
                />
                <HStack space={4}>
                    <Text fontSize="md" color="white" fontWeight="bold">
                        MEN • SOCCER
                    </Text>
                </HStack>

                <IconButton
                    icon={<Icon name="search" size={24} color="white" />}
                    onPress={() => console.log('Search')}
                    variant="unstyled"
                />

            </HStack>
            <RNScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8 }}
            >
                <Box pt={1} px={4} marginBottom={3}>
                    <HStack
                        mt={1}
                        justifyContent="space-between"
                        alignItems="center"
                        space={2}
                    >
                        <Box width={100} alignItems="center">
                            <Text fontSize="xs" color="black">
                                F50
                            </Text>
                        </Box>

                        <Box width={100} alignItems="center">
                            <Text fontSize="xs" color="black">
                                FUTURE ICONS
                            </Text>
                        </Box>

                        <Box width={100} alignItems="center">
                            <Text fontSize="xs" color="black">
                                SUPERLITE 3.0
                            </Text>
                        </Box>

                        <Box width={100} alignItems="center">
                            <Text fontSize="xs" color="black">
                                VL COURT 3.0
                            </Text>
                        </Box>
                    </HStack>
                </Box>
            </RNScrollView>
            <ScrollView >
                <HStack >
                    {products.map((product, idx) => (
                        <ProductCard key={idx} {...product} />
                    ))}
                </HStack>


            </ScrollView>

            <Box bg="#fff" my={4}>
                <Box position="relative">
                    <RNImage

                        source={require('../assets/running1.png')}
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
            </Box>
            <FlatGrid
                itemDimension={150}
                data={products}
                renderItem={({ item }) => (
                    <Box
                        bg="white"
                        rounded="md"
                        overflow="hidden"
                        style={{ margin: 0, padding: 0 }}
                    >
                        <RNImage
                            source={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: 150 }}
                        />
                        <VStack>
                            <Text bold fontSize={12}>{item.name}</Text>
                            <Text fontSize={10}>{item.category}</Text>
                            <Text bold color="green.500">{item.price}</Text>
                            <HStack justifyContent="space-between">
                                <Text fontSize={10}>CODE: {item.code}</Text>
                                <IconButton
                                    icon={<Icon name="heart-outline" size={20} color="black" />}
                                    onPress={() => console.log('Favorite')}
                                />
                            </HStack>
                        </VStack>
                    </Box>
                )}
                itemContainerStyle={{ margin: 0 }}
            />
            <Box bg="#fff" my={4}>
                <Box position="relative">
                    <RNImage

                        source={require('../assets/running2.png')}
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
            </Box>
        </RNScrollView>
    );
};

export default HomeScreen;