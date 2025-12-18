import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
// import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { setUser, setToken } from '../../store/authSlice';
// import uuid from 'react-native-uuid';
import { storeUser } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import { saveUserToDB } from '../../sqlite/database';
type AuthStack = {
  Signup: undefined;
};
type AppStack = {
  Dashboard: undefined;
};
type Navigation = NativeStackNavigationProp<AuthStack & AppStack>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  // const navigation = useNavigation();
  // const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      const res = await auth().signInWithEmailAndPassword(email, password);

      const token = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 12)}`;

      // const token = uuid.v4().toString();

      // dispatch(
      //   setUser({
      //     email: res.user.email ?? '',
      //     uid: res.user.uid,
      //   }),
      // );
      // dispatch(setToken(token));
      await saveUserToDB({ uid: res.user.uid, email: res.user.email });
      dispatch(storeUser({ uid: res.user.uid, email: res.user.email }));

      // if login success redirect
      navigation.replace('Dashboard');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
           placeholderTextColor={'gray'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
           placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {},
});
