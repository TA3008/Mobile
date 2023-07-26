import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const List = ( {navigation} ) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (text) => {
    setSearchText(text);
    // Xử lý tìm kiếm dựa trên giá trị text trong searchText ở đây (nếu cần)
  };

  const handleButton1Press = () => {
    navigation.navigate('Ingredient');
  };

  const handleButton2Press = () => {
    navigation.navigate('List');
  };

  const handleBackIconPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
            <Image source={require('../assets/Icons/Backicon.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>List</Text>
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

        <ScrollView>
        <Text style={styles.title}>Ingredients</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleButton1Press}
            >
                <Text style={styles.buttonText}>Booze, Coffee</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.title}>Recipes</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button,style= {marginBottom: 200}]}
                onPress={handleButton2Press}
            >
                <Text style={styles.buttonText}>Recipes for Booze and Coffee</Text>
            </TouchableOpacity>
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
  button: {
    width: 280,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom:20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#320809',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default List;
