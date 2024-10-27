import { useState } from 'react';
import Auth from '../api/Auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { validateEmail, validatePassword } from '../utils/validate';

export const useRegister = ({ onSuccess = () => {}, onError = () => {} }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const register = async () => {
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address.' });
      return;
    }

    if (!validatePassword(password)) {
      setErrors({ password: 'Password must be at least 8 characters long.' });
      return;
    }

    try {
      setLoading(true);
      setErrors({}); // Clear previous errors

      const data = await Auth.register(email, password, name);
      dispatch(login(data));
      setLoading(false);
      onSuccess(data);
    } catch (error) {
      setErrors({ serverError: error.error || 'Registration failed' });
      setLoading(false);
      onError();
    }
  };

  return {
    name,
    email,
    password,
    errors,
    loading,
    setName,
    setEmail,
    setPassword,
    register,
  };
};
