import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setAuth } from '../shared/store/authSlice';

const Hallway = ({ navigation }) => {
  const styles = StyleSheet.create({});
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocalUser = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      console.log('token', token);
      if (token) {
        try {
          const decodedUser = jwtDecode(token);

          if (decodedUser) {
            dispatch(
              setAuth({ user: decodedUser, token, isAuthenticated: true })
            );
            navigation.navigate('home');
          } else {
            navigation.navigate('auth');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          navigation.navigate('auth');
        }
      } else {
        navigation.navigate('auth');
      }
    };
    fetchLocalUser();
    setLoading(false);
  }, [dispatch, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return null;
};

export default Hallway;
