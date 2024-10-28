import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, validatePassword } from '../utils/validate';
import { loginAsync } from '../store/authSlice';
import { useNavigation } from '@react-navigation/native';

export const useLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const signIn = async () => {
    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
      return;
    }
    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 5 characters long.',
      }));
      return;
    }
    setErrors({});
    dispatch(loginAsync({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('home');
    }
  }, [isAuthenticated, navigation]);

  return {
    email,
    password,
    errors,
    loading,
    setEmail,
    setPassword,
    signIn,
  };
};
