import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useTheme } from '../shared';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Hallway from '../screens/Hallway';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import AuthScreen from '../screens/AuthScreen';
const Main = () => {
  const Stack = createNativeStackNavigator();
  const theme = useTheme();

  const navigationLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.primary.main,
      background: theme.colors.bg.main,
      card: theme.colors.bg.card,
      text: theme.colors.text.primary,
      border: theme.colors.grey.border,
    },
  };

  const navigationDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: theme.colors.primary.main,
      background: theme.colors.bg.main,
      card: theme.colors.bg.card,
      text: theme.colors.text.primary,
      border: theme.colors.grey.border,
    },
  };

  return (
    <NavigationContainer
      theme={theme.dark ? navigationDarkTheme : navigationLightTheme}
    >
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='Hallway'
          component={Hallway}
        />
        <Stack.Screen
          name='auth'
          component={AuthScreen}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='home'
          component={HomeScreen}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name='game'
          component={GameScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
