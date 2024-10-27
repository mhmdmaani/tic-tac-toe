import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../shared';
export const useProtected = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLocalUser = async () => {
      const auth = await AsyncStorage.getItem('auth');
      const authJSon = JSON.parse(auth);
      const token = authJSon?.token;
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          await AsyncStorage.removeItem('auth');
          navigation.navigate('auth');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigation.navigate('auth');
      }
      console.log('authJSon:', authJSon);
      dispatch(login(authJSon));
    };

    fetchLocalUser();
  }, []);
};
