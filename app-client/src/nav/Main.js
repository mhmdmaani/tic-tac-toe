import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useTheme } from '@tic-tac/shared';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Main = () => {
  const Stack = createNativeStackNavigator();
  const { theme, setTheme } = useTheme();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
