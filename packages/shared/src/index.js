import { useCreateNewSession } from './hooks/useCreateNewSession';
import { useGame } from './hooks/useGame';
import { useLogin } from './hooks/useLogin';
import { useRegister } from './hooks/useRegister';
import { useTheme } from './hooks/useTheme';
import { useStats } from './hooks/useStats';
import ReduxProvider from './providers/ReduxProvider';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { toggleTheme } from './store/themeSlice';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

export {
  useCreateNewSession,
  useGame,
  useLogin,
  useRegister,
  useTheme,
  useStats,
  ReduxProvider,
  useSelector,
  useDispatch,
  login,
  logout,
  toggleTheme,
  lightTheme,
  darkTheme,
};
