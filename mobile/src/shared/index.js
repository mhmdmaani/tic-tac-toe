import { useCreateNewSession } from './hooks/useCreateNewSession';
import { useGame } from './hooks/useGame';
import { useLogin } from './hooks/useLogin';
import { useRegister } from './hooks/useRegister';
import { useTheme } from './hooks/useTheme';
import ReduxProvider from './providers/ReduxProvider';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  loginAsync,
  logout,
  registerAsync,
  checkTokenExpiration,
} from './store/authSlice';
import { toggleTheme } from './store/themeSlice';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import { store } from './store/store';

export {
  useCreateNewSession,
  useGame,
  useLogin,
  useRegister,
  useTheme,
  ReduxProvider,
  useSelector,
  useDispatch,
  loginAsync,
  registerAsync,
  checkTokenExpiration,
  logout,
  toggleTheme,
  lightTheme,
  darkTheme,
  store,
};
