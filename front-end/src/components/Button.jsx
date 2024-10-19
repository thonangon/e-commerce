import {StyleSheet, Text} from 'react-native';
import {  Button, HStack, IconButton} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

const ButtonClick = ({title,color,bg,onPress}) => {
  return (
    <Button
      position="absolute"
      bottom={4}
      style={[styles.button, { backgroundColor: bg }]}
      alignSelf="center"
      width="90%"
      onPress={onPress}
      py={2.5}
      >
      <HStack space={200} alignItems="center">
        <Text fontSize="md" style={[styles.buttonText, { color: color }]} >
            {title}
        </Text>
        <IconButton
          icon={<Icon name="arrow-forward-outline" color="black" />}
        />
      </HStack>
    </Button>
  );
};

export default ButtonClick;

const styles = StyleSheet.create({});
