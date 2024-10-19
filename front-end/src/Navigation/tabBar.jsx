import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBar = ({ activeTab }) => {
  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity style={styles.tabItem}>
        <Icon name="home" size={24} color={activeTab === 'Home' ? '#a0522d' : '#d3d3d3'} />
        <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Icon name="heart-outline" size={24} color={activeTab === 'Favourite' ? '#a0522d' : '#d3d3d3'} />
        <Text style={[styles.tabText, activeTab === 'Favourite' && styles.activeTabText]}>Favourite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Icon name="cart-outline" size={24} color={activeTab === 'Cart' ? '#a0522d' : '#d3d3d3'} />
        <Text style={[styles.tabText, activeTab === 'Cart' && styles.activeTabText]}>Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Icon name="person-outline" size={24} color={activeTab === 'Profile' ? '#a0522d' : '#d3d3d3'} />
        <Text style={[styles.tabText, activeTab === 'Profile' && styles.activeTabText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TabBar activeTab="Home" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#d3d3d3',
    marginTop: 4,
  },
  activeTabText: {
    color: '#a0522d',
  },
});

export default HomeScreen;
