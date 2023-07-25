import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const handleLoginPress = async () => {
    try {
      // Lấy thông tin tài khoản đã lưu trong AsyncStorage
      const storedAccountJson = await AsyncStorage.getItem('account');
      if (storedAccountJson) {
        const storedAccount = JSON.parse(storedAccountJson);
        // Kiểm tra đăng nhập
        if (email === storedAccount.email && password === storedAccount.password) {
          // Đăng nhập thành công
          // Hiển thị thông báo đăng nhập thành công
          alert('Login successful!');
          // Điều hướng đến màn hình Home (hoặc màn hình bạn muốn sau khi đăng nhập thành công)
          navigation.navigate('Home');
        } else {
          // Đăng nhập không thành công
          alert('Invalid email or password');
        }
      } else {
        // Chưa có tài khoản trong AsyncStorage
        alert('No account found');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred');
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <TextInput
        style={styles.Textbox}
        value={email}
        onChangeText={handleEmailChange}
        placeholder="Email"
      />
      <TextInput
        style={styles.Textbox}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.buttonlogin}
        onPress={handleLoginPress}
      >
        <Text style={styles.buttonloginText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={handleRegisterPress}
      >
        <Text style={styles.buttonRegisterText}>Register</Text>
      </TouchableOpacity>
    </View>
  )
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: deviceWidth, 
    height: deviceWidth * 0.8, 
    marginBottom: 40,
    marginTop:220,
  },
  Textbox: {
    width: 330,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    borderColor: '#320809',
    borderWidth: 1,
    marginBottom: 40,
    paddingLeft: 15, 
  },
  TextboxText: {
    textAlign: 'left',
    color: '#320809',
    position: 'absolute', 
    top: '50%', 
    left: 25, 
    transform: [{ translateY: -10 }], 
  },
  buttonlogin: {
    width: 280,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#320809",
    justifyContent: 'center',
    marginBottom: 25,
  },
  buttonloginText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonRegister: {
    width: 280,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#320809',
    marginBottom: 270,
    marginTop: 10,
  },
  buttonRegisterText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Login;
