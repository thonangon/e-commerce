import React, { useEffect, useState } from 'react';
import { ScrollView as RNScrollView, ActivityIndicator, FlatList } from 'react-native';
import { Box, Text } from 'native-base';
import axios from 'axios';

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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://10.0.2.2:8000/category/main-categories/');
                const soccerProducts = data.results.flatMap(category =>
                    category.subcategories.flatMap(subcategory =>
                        subcategory.categories.filter(item => item.name === "SOCCER")
                    )
                );
                setSoccerItems(soccerProducts);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;
    const soccerItemCount = soccerItems.length;

    return (
        <RNScrollView>
            <Header />
            <Box padding={4} alignItems="center">
                <Text fontSize="lg" fontWeight="bold">
                    Count: {soccerItemCount}
                </Text>
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
