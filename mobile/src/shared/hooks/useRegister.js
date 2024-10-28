import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from '../store/authSlice';
import { validateEmail, validatePassword } from '../utils/validate';
import { useNavigation } from '@react-navigation/native';

export const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const register = async () => {
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address.' });
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ password: 'Password must be at least 8 characters long.' });
      return;
    }
    setErrors({});

    dispatch(registerAsync({ name, email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('home');
    }
  }, [isAuthenticated, navigation]);

  return {
    name,
    email,
    password,
    errors,
    setName,
    setEmail,
    setPassword,
    register,
  };
};
