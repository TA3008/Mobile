import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

const SideDrawer = ( {navigation} ) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleMenuPress = () => {
    navigation.navigate('Menu');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleLogoutPress = () => {
    navigation.navigate('Login');
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
          <TouchableOpacity  onPress={handleMenuPress}>
            <Text style={styles.menuText}>List</Text>
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
          <TouchableOpacity  onPress={handleLogoutPress}>
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    zIndex: 1,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#320809',
  },
  contentContainer: {
    flex: 1,
    zIndex: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 20,
  },
});

export default SideDrawer;
