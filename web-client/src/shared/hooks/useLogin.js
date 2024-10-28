import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { validateEmail, validatePassword } from '../utils/validate';
import { loginAsync } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
    setErrors({});
    dispatch(loginAsync({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
