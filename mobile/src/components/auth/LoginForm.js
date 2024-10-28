import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useLogin, useTheme } from '../../shared';
import FadeInUp from '../../components/animations/FadeInUp';

export default function LoginForm({ onSignupPress }) {
  const { email, password, errors, loading, setEmail, setPassword, signIn } =
    useLogin();

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
    <FadeInUp>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
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
          onPress={signIn}
          disabled={loading || !email || !password}
        >
          {loading ? (
            <ActivityIndicator color='white' />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        <Pressable style={styles.linkStyle} onPress={onSignupPress}>
          <Text style={styles.linkText}>Do not Have Account ?</Text>
        </Pressable>
      </View>
    </FadeInUp>
  );
}
