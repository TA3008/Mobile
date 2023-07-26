import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const [amount, setAmount] = useState(1); // Số lượng mặc định là 1

  useEffect(() => {
    retrieveCartData();
  }, []);

  const retrieveCartData = async () => {
    try {
      const cartDataString = await AsyncStorage.getItem("cartData");
      if (cartDataString) {
        const parsedCartData = JSON.parse(cartDataString);
        const cartItem = parsedCartData.find(item => item.id === product.id);
        if (cartItem) {
          setAmount(cartItem.amount);
        }
      }
    } catch (error) {
      console.log("Error retrieving cart data:", error);
    }
  };

  const handleBuyButtonPress = async () => {
    let cartData = await AsyncStorage.getItem("cartData");
    if (cartData) {
      cartData = JSON.parse(cartData);
      const cartItemIndex = cartData.findIndex(item => item.id === product.id); //nếu đã có sản phẩm trong giỏ hàng thì chỉ tăng số lượng
      if (cartItemIndex !== -1) {
        cartData[cartItemIndex].amount += amount;
      } else {
        cartData.push({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          amount: amount,
        });
      }
    } else {
      cartData = [{
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        amount: amount,
      }];
    }
    AsyncStorage.setItem("cartData", JSON.stringify(cartData));
    navigation.navigate("Cart");
  };

  const handleBackIconPress = () => {
    navigation.goBack();
  };

  const handleIncreaseAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const handleDecreaseAmount = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  // Tính tổng tiền của sản phẩm
  const price = parseFloat(product.price);
  const totalAmount = (amount * product.price).toFixed(0); //lấy sai số 2 đơn vị

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
          <Image source={require('../assets/Icons/Backicon.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>{product.name}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.image} />
      </View>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} VNĐ</Text>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>SỐ LƯỢNG</Text>
        <View style={styles.amountControls}>
          <TouchableOpacity onPress={handleDecreaseAmount} style={styles.amountButton}>
            <Text style={styles.amountButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.amountText}>{amount}</Text>
          <TouchableOpacity onPress={handleIncreaseAmount} style={styles.amountButton}>
            <Text style={styles.amountButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.totalAmountText}>Tổng tiền: {totalAmount} VNĐ</Text>

      <TouchableOpacity style={styles.buyButton} onPress={handleBuyButtonPress}>
        <Text style={styles.buyButtonText}>Thêm Vào Giỏ Hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#320809',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backIcon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingTop: 30,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 8,
    marginBottom: 20,
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  price: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  buyButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buyButtonText: {
    color: '#320809',
    fontWeight: 'bold',
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  amountLabel: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  amountControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountButton: {
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  amountButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#320809',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  totalAmountText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ProductDetail;
