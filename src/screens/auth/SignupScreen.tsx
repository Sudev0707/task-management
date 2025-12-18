import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux'
import {storeUser} from "../../redux/slice"
type AuthStack = {
  Login: undefined;
};

type Navigation = NativeStackNavigationProp<AuthStack>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  // const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const dispatch = useDispatch();
  //
  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const res = await auth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      );
      dispatch(storeUser({uid: res.user.uid, email: res.user.email}))

      console.log( res);
      Alert.alert( 'account created');

      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('signup failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Enter email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Enter password"
         placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    color:"#000"
  },
  btn: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
});
