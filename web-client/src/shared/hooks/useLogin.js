import { useState } from 'react';
import Auth from '../api/Auth';
import { useDispatch } from 'react-redux';
import { validateEmail, validatePassword } from '../utils/validate';
import { login } from '../store/authSlice';

export const useLogin = ({ onSuccess = () => {}, onError = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signIn = async () => {
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address.' });
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ password: 'Password must be at least 5 characters long.' });
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const data = await Auth.login(email, password);
      dispatch(login(data));
      setLoading(false);
      console.log('data', data);
      onSuccess(data);
    } catch (error) {
      setErrors({ serverError: error.message || 'Login faild failed' });
      onError(error);
      setLoading(false);
    }
  };

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
