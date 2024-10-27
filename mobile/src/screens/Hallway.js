import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Hallway = ({ navigation }) => {
  const styles = StyleSheet.create({});
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const fetchLocalUser = async () => {
      const auth = await AsyncStorage.getItem('auth');
      const token = auth ? JSON.parse(auth).token : null;
      if (token) {
        setUser(token);
      }
    };
    if (user) {
      navigation.navigate('home');
    } else {
      navigation.navigate('auth');
    }
    fetchLocalUser();
  }, [user]);

  if (loading) {
    return <ActivityIndicator />;
  }
  return null;
};

export default Hallway;
