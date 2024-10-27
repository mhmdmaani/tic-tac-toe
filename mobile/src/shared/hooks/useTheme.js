import { useSelector } from 'react-redux';
import darkTheme from '../themes/darkTheme';
import lightTheme from '../themes/lightTheme';

export const useTheme = () => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  console.log('currentTheme:', currentTheme);
  return currentTheme === 'light' ? lightTheme : darkTheme;
};
