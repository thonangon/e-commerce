import React from 'react';
import { ScrollView } from 'react-native';
import { Box, HStack, Text } from 'native-base';

const HorizontalScrollMenu = () => {
    const data = ['F50', 'FUTURE ICONS', 'SUPERLITE 3.0', 'VL COURT 3.0'];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
            <Box pt={1} px={4} marginBottom={3}>
                <HStack justifyContent="space-between" alignItems="center" space={4}>
                    {data.map((label) => (
                        <Box key={label} width={100} alignItems="center">
                            <Text fontSize="xs" color="black">
                                {label}
                            </Text>
                        </Box>
                    ))}
                </HStack>
            </Box>
        </ScrollView>
    );
};

export default HorizontalScrollMenu;
