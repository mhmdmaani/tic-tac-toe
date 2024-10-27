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
import { useLogin, useTheme } from '../shared';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function AuthScreen() {
  const theme = useTheme();
  const [currentView, setCurrentView] = useState('login');

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
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {currentView === 'login' ? (
          <LoginForm onSignupPress={() => setCurrentView('register')} />
        ) : (
          <RegisterForm onLoginPress={() => setCurrentView('login')} />
        )}
      </View>
    </ImageBackground>
  );
}
