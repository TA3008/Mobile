import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const ProductItem = () => {
  // Dữ liệu của các sản phẩm
  const productsData = [
    {
      id: 1,
      image: require('../assets/Latest/1.png'),
      name: 'Product 1',
      price: '$10.99',
      type: 'Booze',
    },
    {
      id: 2,
      image: require('../assets/Latest/2.png'),
      name: 'Product 2',
      price: '$20.99',
      type: 'Booze',
    },
    {
      id: 3,
      image: require('../assets/Latest/3.png'),
      name: 'Product 3',
      price: '$20.99',
      type: 'Coffee',
    },
  ];

  const renderProductItem = ({ item }) => (
    <View key={item.id} style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.productsContainer}>
      <FlatList
        data={productsData}
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
