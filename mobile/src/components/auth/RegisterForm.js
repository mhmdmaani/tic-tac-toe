import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import { useLogin, useRegister, useTheme } from '../../shared';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FadeInDown from '../../components/animations/FadeInDown';

export default function RegisterForm({ onLoginPress }) {
  const navigation = useNavigation();
  const {
    email,
    password,
    errors,
    loading,
    setEmail,
    setPassword,
    register,
    name,
    setName,
  } = useRegister({
    onSuccess: async (data) => {
      Toast.show('Register successful');
      await AsyncStorage.setItem('auth', JSON.stringify(data));
      navigation.navigate('home');
    },
    onError: () => {
      Toast.show('Register failed');
      setEmail('');
      setPassword('');
    },
  });

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.colors.text.main,
      textAlign: 'center',
    },
    inputContainer: {
      backgroundColor: theme.colors.bg.card,
      borderRadius: 5,
      marginBottom: 10,
    },
    input: {
      height: 50,
      padding: 10,
      fontSize: 16,
      color: theme.colors.text.main,
    },
    button: {
      backgroundColor: theme.colors.primary.main,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    linkStyle: {
      marginTop: 20,
      alignItems: 'center',
    },
    linkText: {
      color: theme.colors.text.main,
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 20,
    },
    formContainer: {
      backgroundColor: theme.colors.bg.main,
      padding: 20,
      borderRadius: 10,
    },
  });

  return (
    <FadeInDown>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='name'
            value={name}
            onChangeText={setName}
            keyboardType='text'
            autoCapitalize
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={register}
          disabled={loading || !email || !password}
        >
          {loading ? (
            <ActivityIndicator color='white' />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <Pressable style={styles.linkStyle} onPress={onLoginPress}>
          <Text style={styles.linkText}>Already Have Account ?</Text>
        </Pressable>
      </View>
    </FadeInDown>
  );
}
