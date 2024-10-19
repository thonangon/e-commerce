import React, { useState } from 'react';
import { VStack, Input, Button,  Text,  HStack } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AddNewAddress = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [form, setForm] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    country: ''
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const saveAddress = () => {
    // Handle save address logic
    console.log('Address saved:', form);
  };
  const handleCheckIn = () =>{
    navigation.goBack('CHART');
  }
  return (
    <VStack space={4} p={4} w="100%" maxW="400px" mx="auto">
      {/* Header with Back Arrow */}
      <HStack alignItems="center" space={2}>
        <Icon  name="chevron-back-outline" size={23} color="black" onPress={handleCheckIn}/>
        <Text  bold fontSize={23}>Add New Address</Text>
      </HStack>

      {/* Input Fields */}
      <Input
        placeholder="Name"
        value={form.name}
        onChangeText={value => handleInputChange('name', value)}
      />
      <Input
        placeholder="Address Line 1"
        value={form.addressLine1}
        onChangeText={value => handleInputChange('addressLine1', value)}
      />
      <Input
        placeholder="Address Line 2"
        value={form.addressLine2}
        onChangeText={value => handleInputChange('addressLine2', value)}
      />
      <Input
        placeholder="Town / City"
        value={form.city}
        onChangeText={value => handleInputChange('city', value)}
      />
      <Input
        placeholder="State"
        value={form.state}
        onChangeText={value => handleInputChange('state', value)}
      />
      <Input
        placeholder="Zip Code"
        value={form.zipCode}
        onChangeText={value => handleInputChange('zipCode', value)}
      />
      <Input
        placeholder="Phone"
        value={form.phone}
        onChangeText={value => handleInputChange('phone', value)}
      />
      <Input
        placeholder="Country"
        value={form.country}
        onChangeText={value => handleInputChange('country', value)}
      />

      <Button
        mt={4}
        size="lg"
        bg="#00C2C2"
        onPress={handleCheckIn}
        _text={{ color: 'white' }}
        leftIcon={<Icon  name="arrow-forward" size={23} color="white" />}
      >
        Save New Address
      </Button>
    </VStack>
  );
};

export default AddNewAddress;
