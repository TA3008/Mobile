import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Data from '../components/Data';
import { ScrollView } from 'react-native-virtualized-view'

const Ingredient = ( {navigation} ) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (text) => {
    setSearchText(text);
    // Xử lý tìm kiếm dựa trên giá trị text trong searchText ở đây (nếu cần)
  };

  const handleBackIconPress = () => {
    navigation.goBack();
  };

  const renderBoozeItem = ({ item }) => {
    // Kiểm tra nếu sản phẩm không thuộc kiểu 'Booze' thì không hiển thị
    if (item.type !== 'Booze') {
      return null;
    }
  
    return (
      <View key={item.id} style={styles.container}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    );
  };

  const renderCoffeeItem = ({ item }) => {
    // Kiểm tra nếu sản phẩm không thuộc kiểu 'Booze' thì không hiển thị
    if (item.type !== 'Coffee') {
      return null;
    }
  
    return (
      <View key={item.id} style={styles.container}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
            <Image source={require('../assets/Icons/Backicon.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>Ingredient</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
        <Icon name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearchChange}
          />
          <TouchableOpacity style={styles.menuButton}>
          <Icon name="search" size={24} color="white" />
        </TouchableOpacity>
        </View>

        <View style={styles.logo}>
            <Image source={require('../assets/Minilogo.png')}/>
        </View>

        <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }} >
          <View>
            <Text style={styles.title}>Booze</Text>
            <ScrollView horizontal={true} style={{ width: "100%" }}>
              <FlatList
        data={Data}
        renderItem={renderBoozeItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Đặt số cột là 2
        contentContainerStyle={styles.listContainer}
              />
            </ScrollView>
          </View>

          <View>
            <Text style={styles.title}>Coffee</Text>
            <ScrollView horizontal={true} style={{ width: "100%" }}>
              <FlatList
        data={Data}
        renderItem={renderCoffeeItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Đặt số cột là 2
        contentContainerStyle={styles.listContainer}
              />
            </ScrollView>
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#320809',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  searchInput: {
    width: 300,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  logo : {
    alignItems: 'center',   
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
  },
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

export default Ingredient;
