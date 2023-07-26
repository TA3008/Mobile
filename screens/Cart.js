import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';

const Cart = ({navigation}) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    retrieveCartData();
  }, []);

  const retrieveCartData = async () => {
    try {
      const cartDataString = await AsyncStorage.getItem("cartData");
      if (cartDataString) {
        const parsedCartData = JSON.parse(cartDataString);
        setCartData(parsedCartData);
      }
    } catch (error) {
      console.log("Error retrieving cart data:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const updatedCartData = cartData.filter(item => item.id !== itemId);
      await AsyncStorage.setItem("cartData", JSON.stringify(updatedCartData));
      setCartData(updatedCartData);
    } catch (error) {
      console.log("Error deleting item from cart:", error);
    }
  };

  const handlePayment = async () => {
    try {
      // Nếu thanh toán thành công thì sẽ thông báo
      Alert.alert("Payment Success", "Thank you for your purchase!", [
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem("cartData");
            setCartData([]);
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      console.log("Error during payment:", error);
    }
  };

  const renderItem = ({ item }) => {
    // Tính tổng giá tiền cho mỗi sản phẩm
    const totalPrice = (item.price * item.amount).toFixed(0);
  
    return (
      <View style={styles.cartItem}>
        <Image source={item.image} style={styles.cartItemImage} />
        <View style={styles.cartItemInfo}>
          <Text style={styles.cartItemName}>{item.name}</Text>
          <Text style={styles.cartItemPrice}>{item.price} VNĐ</Text>
          <Text style={styles.cartItemAmount}>Số lượng: {item.amount}</Text>
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>{totalPrice} VNĐ</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(item.id)}
        >
          <Icon name="trash-o" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
      </View>  
      <Text style={styles.title}>Giỏ Hàng Của Bạn</Text>
      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
        padding: 25,
        backgroundColor: '#320809',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      backButton: {
        marginRight: 10,
      },
      title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingTop: 30,
      },
      cartList: {
        paddingBottom: 100, 
      },
      cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      cartItemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
      },
      cartItemInfo: {
        marginLeft: 15,
        flex: 1, 
      },
      cartItemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      cartItemPrice: {
        fontSize: 16,
        color: 'white',
      },
      cartItemAmount: {
        fontSize: 14,
        color: 'white',
      },
      deleteButton: {
        marginLeft: 10,
      },
      totalPriceContainer: {
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
      },
      totalPriceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#320809',
      },
      paymentButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      paymentButtonText: {
        color: '#320809',
        fontWeight: 'bold',
        fontSize: 16,
      },
});

export default Cart;
