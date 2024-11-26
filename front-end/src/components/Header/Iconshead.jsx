import { HStack, IconButton, Box, Center, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
const IconsHead = ({ title, subtitle, bgColor = "#008080", onLeftPress, onRightPress }) => {
    const navigation = useNavigation();
    return (
        <Box bg={bgColor} py={4}>
            <HStack alignItems="center" justifyContent="space-between" px={4}>
                <IconButton
                    icon={<Ionicons name="chevron-back" size={24} color="white" />}
                    onPress={() => navigation.goBack()}
                    variant="unstyled"
                    accessibilityLabel="Go back"
                    borderRadius="full"
                />
                <Center>
                    <Text color="white" fontSize="lg" fontWeight="bold">
                        {title}
                    </Text>
                    {subtitle && (
                        <Text color="gray.300" fontSize="sm">
                            {subtitle}
                        </Text>
                    )}
                </Center>
                <IconButton
                    icon={<Ionicons name="search" size={24} color="white" />}
                    onPress={onRightPress}
                    borderRadius="full"
                />
            </HStack>
        </Box>
    );
};

export default IconsHead;
