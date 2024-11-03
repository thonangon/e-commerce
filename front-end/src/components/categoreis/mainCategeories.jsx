// MainCategorySelect.js
import React, { useEffect, useCallback, useState } from 'react';
import { Select, VStack } from 'native-base';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const MainCategorySelect = ({ selectedMainCategory, onSelectMainCategory }) => {
  const [categories, setCategories] = useState([]);

  const fetchMainCategories = useCallback(async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/category/main-categories/');
      const categoriesData = response.data.results || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching main categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchMainCategories();
  }, [fetchMainCategories]);

  return (
    <VStack>
      <Select
        selectedValue={selectedMainCategory}
        placeholder="Select Main Category"
        onValueChange={onSelectMainCategory}
        dropdownIcon={<Icon name="chevron-down-outline" size={16} color="black" />}
        variant="filled"
        py={1}
      >
        {categories.length > 0
          ? categories.map((mainCategory) => (
              <Select.Item key={mainCategory.id} label={mainCategory.name} value={mainCategory.id.toString()} />
            ))
          : <Select.Item label="No categories available" value="" />}
      </Select>
    </VStack>
  );
};

export default MainCategorySelect;
