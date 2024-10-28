import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, useTheme, logout } from '../../shared';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import { useNavigation } from '@react-navigation/native';
export default function HomeHeader() {
  const user = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate.navigate('auth');
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    greetingText: {
      fontSize: 18,
      color: theme.colors.primary.main,
    },
    toggleThemeButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    iconColor: {
      color: theme.colors.text.main,
    },
    buttonsContainer: {
      flexDirection: 'row',
      gap: 10,
    },
  });

  return (
    <View style={[styles.container]}>
      <Text style={styles.greetingText}>Welcome, {user?.name}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleToggle}
          style={styles.toggleThemeButton}
        >
          {currentTheme === 'light' ? (
            <MaterialIcons
              name='dark-mode'
              size={30}
              color={styles.iconColor.color}
            />
          ) : (
            <MaterialIcons
              name='light-mode'
              size={30}
              color={styles.iconColor.color}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons
            name='logout'
            size={30}
            color={styles.iconColor.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
