import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import { API_URL } from '../../config';

const AddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [mainCategories, setMainCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch Categories, Colors, and Sizes
      const [responseCategories, responseColors, responseSizes] = await Promise.all([
        axios.get(`${API_URL}/category/main-categories/`),
        axios.get(`${API_URL}/color/colors/`),
        axios.get(`${API_URL}/size/sizes/`),
      ]);

      // Handle Categories
      if (responseCategories.status === 200) {
        const mainCats = responseCategories.data.results.map((mainCat) => ({
          id: mainCat.id,
          name: mainCat.name,
        }));

        const subCats = responseCategories.data.results.flatMap((mainCat) =>
          mainCat.subcategories?.map((subCat) => ({
            id: subCat.id,
            name: subCat.name,
            mainCategoryId: subCat.main_category,
          }))
        );

        const cats = responseCategories.data.results.flatMap((mainCat) =>
          mainCat.subcategories?.flatMap((subCat) =>
            subCat.categories?.map((cat) => ({
              id: cat.id,
              name: cat.name,
              subCategoryId: cat.sub_category,
            }))
          )
        );

        setMainCategories(mainCats);
        setSubcategories(subCats);
        setCategories(cats);
      }

      // Handle Colors
      if (responseColors.status === 200) {
        const formattedColors = responseColors.data.results.map((color) => ({
          id: color.colorId,
          name: color.colorName,
        }));
        setColorOptions(formattedColors);
      }

      // Handle Sizes
      if (responseSizes.status === 200) {
        const formattedSizes = responseSizes.data.results.map((size) => ({
          id: size.sizeId,
          name: size.size_name && size.size_numeric
            ? `${size.size_name} (${size.size_numeric})`
            : size.size_name || size.size_numeric,
        }));
        setSizes(formattedSizes);
      }
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMainCategoryChange = (mainCategoryId) => {
    setSelectedMainCategory(mainCategoryId);
    setSubcategory('');
    setCategory('');
  };

  const handleSubmit = async () => {
    if (!productName || !category || !subcategory || !selectedColor || !selectedSize) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const payload = {
      name: productName,
      heading,
      subheading,
      category,
      subcategory,
      color: selectedColor,
      size: selectedSize,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/product/products/`, payload);

      if (response.status === 201) {
        Alert.alert('Success', 'Product added successfully!');
        // Reset form
        setProductName('');
        setCategory('');
        setSubcategory('');
        setSelectedMainCategory(null);
        setHeading('');
        setSubheading('');
        setSelectedColor(null);
        setSelectedSize(null);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to add product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubcategories = subcategories.filter(
    (subCat) => subCat.mainCategoryId === selectedMainCategory
  );

  const filteredCategories = categories.filter(
    (cat) => cat.subCategoryId === subcategory
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descriptions</Text>
        <TextInput
          style={styles.input}
          placeholder="Heading"
          value={heading}
          onChangeText={setHeading}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Subheading"
          value={subheading}
          onChangeText={setSubheading}
          multiline
        />
      </View>

      <Text style={styles.label}>Main Category</Text>
      <View style={styles.buttonContainer}>
        {mainCategories.map((mainCat) => (
          <TouchableOpacity
            key={mainCat.id}
            style={styles.button}
            onPress={() => handleMainCategoryChange(mainCat.id)}
          >
            <Text style={styles.buttonText}>{mainCat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMainCategory && (
        <>
          <Text style={styles.label}>Subcategory</Text>
          <View style={styles.buttonContainer}>
            {filteredSubcategories.map((subCat) => (
              <TouchableOpacity
                key={subCat.id}
                style={styles.button}
                onPress={() => setSubcategory(subCat.id)}
              >
                <Text style={styles.buttonText}>{subCat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {subcategory && (
        <>
          <Text style={styles.label}>Category</Text>
          <View style={styles.buttonContainer}>
            {filteredCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.button}
                onPress={() => setCategory(cat.id)}
              >
                <Text style={styles.buttonText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colors</Text>
        <View style={styles.colorOptions}>
          {colorOptions.map((color) => (
            <TouchableOpacity
              key={color.id}
              style={[
                styles.colorOption,
                selectedColor === color.id && styles.colorOptionSelected,
              ]}
              onPress={() => setSelectedColor(color.id)}
            >
              <Text
                style={
                  selectedColor === color.id
                    ? styles.colorTextSelected
                    : styles.colorText
                }
              >
                {color.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedColor && (
          <Text style={styles.selectedText}>
            Selected Color: {colorOptions.find((color) => color.id === selectedColor)?.name}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizes</Text>
        <View style={styles.optionsContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size.id}
              style={[
                styles.option,
                selectedSize === size.id && styles.optionSelected,
              ]}
              onPress={() => setSelectedSize(size.id)}
            >
              <Text
                style={
                  selectedSize === size.id
                    ? styles.optionTextSelected
                    : styles.optionText
                }
              >
                {size.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedSize && (
          <Text style={styles.selectedText}>
            Selected Size: {sizes.find((size) => size.id === selectedSize)?.name}
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
        <Text style={styles.uploadButtonText}>
          {loading ? 'Submitting...' : 'Submit Product'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#343a40',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#495057',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    color: '#495057',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    margin: 5,
  },
  buttonSelected: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    color: '#495057',
  },
  buttonTextSelected: {
    color: '#ffffff',
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  colorOption: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  colorOptionSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  colorText: {
    color: '#495057',
    fontSize: 12,
  },
  colorTextSelected: {
    color: '#ffffff',
    fontSize: 12,
  },
  optionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 25,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 15,
  },
  
  colorOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  colorOptionSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  colorText: {
    color: '#495057',
  },
  colorTextSelected: {
    color: '#ffffff',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  optionSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  optionText: {
    color: '#495057',
  },
  optionTextSelected: {
    color: '#ffffff',
  },
  selectedText: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
