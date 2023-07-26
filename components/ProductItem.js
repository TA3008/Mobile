import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Data from './Data';


const ProductItem = ({navigation}) => {

  const handleProductPress = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const renderProductItem = ({ item }) => (
    <View key={item.id} style={styles.container}>
      <TouchableOpacity
        onPress={() => handleProductPress(item)}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} VNĐ</Text>
      </TouchableOpacity>
      
    </View>
  );
  
  return (
    <View style={styles.productsContainer}>
      <FlatList
        data={Data}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Đặt số cột là 2
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    flex: 1,
    alignItems: 'center', 
    paddingTop: 20, 
    backgroundColor: '#320809',
  },
  container: {
    padding: 25,
    marginBottom: 20,
    borderRadius: 8,
  },
  image: {
    width: 120,
    height: 200,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  price: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});

export default ProductItem;
