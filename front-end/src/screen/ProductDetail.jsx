import React from 'react';
import { ScrollView as RNScrollView, Image as RNImage } from 'react-native';
import { Box, Text, VStack, HStack, IconButton, Image, ScrollView, } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
import colors from '../utils/colors';

import ProductCard from '../components/SoccerMen/ProductCard';
import Header from '../components/SoccerMen/Header';
import HorizontalScrollMenu from '../components/SoccerMen/ScrolMenue';
import Banner from '../components/SoccerMen/Banner';

const Loading = () => <ActivityIndicator size="large" color="#00C2C2" />;
const ErrorMessage = ({ message }) => <Text>Error: {message}</Text>;

const HomeScreen = () => {
    const [soccerItems, setSoccerItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <HorizontalScrollMenu />
            <Banner />
            <FlatList
                data={soccerItems}
                renderItem={({ item }) => <ProductCard image={item.image} name={item.name} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
            />
        </RNScrollView>
    );
};
export default HomeScreen;
