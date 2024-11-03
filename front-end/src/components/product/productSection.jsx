// ProductSection.js
import React from 'react';
import { HStack, Heading, Button, Text, ScrollView, Divider } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductCard from './productCard';

const ProductSection = ({ title, products }) => (
  <>
    <HStack justifyContent="space-between" alignItems="center" px={4} mt={5}>
      <Heading size="md">{title}</Heading>
      <Button size="sm">
        <HStack>
          <Text>SEE ALL</Text>
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
  </>
);

export default ProductSection;
