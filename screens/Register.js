import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Register = ({ navigation }) => {
  // State để lưu giá trị của các trường nhập liệu
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBackIconPress = () => {
    navigation.goBack();
  };

  const handleRegisterPress = async () => {
    try {
      // Lưu thông tin nhập vào
      await AsyncStorage.setItem('account', JSON.stringify({ email, password }));
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
  
      // Thông báo nếu đăng kí thành công
      Alert.alert('Registration Success', 'You have successfully registered!', [
        {
          text: 'OK',
          onPress: () => {
            // Sau khi đăng kí xong thì chuyển hướng về trang Login
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
        <Image source={require('../assets/Icons/Backicon.png')} />
        <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Tạo một tài khoản mới</Text>
      <TextInput
        style={[styles.Textbox, styles.TextboxText]}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full name"
        placeholderTextColor="white"
      />
      <TextInput
        style={[styles.Textbox, styles.TextboxText]}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone number"
        placeholderTextColor="white"
      />
      <TextInput
        style={[styles.Textbox, styles.TextboxText]}
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        placeholderTextColor="white"
      />
      <TextInput
        style={[styles.Textbox, styles.TextboxText]}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
      />

      <TouchableOpacity style={styles.buttonRegister} onPress={handleRegisterPress}>
        <Text style={styles.buttonRegisterText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#320809',
  },
  backIcon: {
    position: 'absolute',
    top: 20, 
    left: 20, 
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'left',
    alignSelf: 'flex-start', 
    marginBottom: 110, 
    paddingLeft: 20,
  },
  Textbox: {
    width: 330,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 40,
    paddingLeft: 15, 
  },
  TextboxText: {
    color: 'white',
  },
  buttonlogin: {
    width: 280,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5EA33A",
    justifyContent: 'center',
    marginBottom: 30,
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
    backgroundColor: 'white',
    marginBottom: 50,
    marginTop: 10,
  },
  buttonRegisterText: {
    textAlign: 'center',
    color: '#320809',
  },
});

export default Register;
