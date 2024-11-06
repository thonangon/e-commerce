import React from 'react';
import { HStack, IconButton, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();

    return (
        <HStack justifyContent="space-between" alignItems="center" px={3} py={2} bg="#00C2C2">
            <IconButton
                icon={<Icon name="chevron-back" size={24} color="white" />}
                onPress={() => navigation.goBack()}
                variant="unstyled"
            />
            <Text fontSize="md" color="white" fontWeight="bold">
                MEN • SOCCER
            </Text>
            <IconButton
                icon={<Icon name="search" size={24} color="white" />}
                onPress={() => console.log('Search')}
                variant="unstyled"
            />
        </HStack>
    );
};

export default Header;
