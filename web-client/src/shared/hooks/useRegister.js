import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../store/authSlice';
import { validateEmail, validatePassword } from '../utils/validate';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
