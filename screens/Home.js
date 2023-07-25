import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductItem from '../components/ProductItem';

const Home = ( {navigation} ) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const deviceWidth = Dimensions.get('window').width;
  const [searchText, setSearchText] = useState('');

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleListPress = () => {
    navigation.navigate('List');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    // Xử lý tìm kiếm dựa trên giá trị text trong searchText ở đây (nếu cần)
  };

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={closeDrawer} style={styles.animatedBox}>
        <Icon name="bars" size={24} color="black" style={{paddingHorizontal: 15, paddingVertical: 2, paddingBottom:70}} />
        <View style={styles.menuItem}>
            <Image source={require('../assets/Icons/home.png')}/>
            <TouchableOpacity  onPress={handleHomePress}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem}>
            <Image source={require('../assets/Icons/menu.png')}/>
          <TouchableOpacity  onPress={handleListPress}>
            <Text style={styles.menuText}>Menu</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem}>
            <Image source={require('../assets/Icons/search.png')}/>
          <Text style={styles.menuText}>Search</Text>
        </View>
        <View style={styles.menuItem}>
            <Image source={require('../assets/Icons/cart.png')}/>
          <Text style={styles.menuText}>Cart</Text>
        </View>
        <View style={styles.menuItem}>
            <Image source={require('../assets/Icons/logout.png')}/>
          <Text style={styles.menuText}>Logout</Text>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
          <Icon name="bars" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton}>
        <Icon name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <MenuDrawer
          open={isDrawerOpen}
          position={'left'}
          drawerContent={this.drawerContent()}
          drawerPercentage={80}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
        </MenuDrawer>
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
        <ScrollView>
            <View style={[styles.bannerContainer, style= {width: deviceWidth, height: deviceWidth *0.5, }]}>
            <Image source={require('../assets/Banner.png')} style={styles.banner} />
            </View>
            <Text style={styles.title}>Collections</Text>
            <View style={styles.collection}>
              <Image source={require('../assets/Collections/Hotdrinks.png')} style={styles.collectionimg}/>
              <Image source={require('../assets/Collections/Moreice.png')} style={styles.collectionimg}/>
              <Image source={require('../assets/Collections/Drunkdays.png')} style={styles.collectionimg}/>
            </View>
            <Text style={styles.title}>Latest</Text>
            <View style={styles.collection}>
              <ProductItem/>
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
  bannerContainer: {
    marginBottom: 40,
  },
  banner: {
    width: 390,
    height: 200,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 20,
  },
  collection: {
    flexDirection: 'row',
  },
  collectionimg: {
    marginLeft: 10,
    height: 220,
    width: 110,
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
});

export default Home;
