// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login, useDispatch } from '../shared';

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('auth');
  const dispatch = useDispatch();
  const authJSon = JSON.parse(auth);
  const token = authJSon?.token;
  if (!token) {
    return <Navigate to='/login' />;
  }
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('auth');
      return <Navigate to='/login' />;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to='/login' />;
  }
  dispatch(login(authJSon));

  return children;
};

export default PrivateRoute;
