import { HStack ,IconButton} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
const IconsHead = ({ onSearch }) => {
    const navigation = useNavigation();
    return (
        <HStack justifyContent="space-between" alignItems="center" px={3} py={2} bg="#00C2C2">
            <IconButton
                icon={<Icon name="chevron-back" size={24} color="white" />}
                onPress={() => navigation.goBack()}
                variant="unstyled"
                accessibilityLabel="Go back"
            />
            <IconButton
                icon={<Icon name="search" size={24} color="white" />}
                onPress={() => console.log('Search triggered')} // Modify to open a search bar if needed
                variant="unstyled"
                accessibilityLabel="Search products"
            />
        </HStack>
    );
};


export default IconsHead;
