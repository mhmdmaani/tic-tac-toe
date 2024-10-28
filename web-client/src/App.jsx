import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import Login from './pages/Login';
import CustomThemeProvider from './providers/CustomThemeProvider';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { checkTokenExpiration } from './shared';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  return (
    <CustomThemeProvider>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path='/play'
            element={
              <PrivateRoute>
                <Play />
              </PrivateRoute>
            }
          />

          <Route
            path='/play/:id'
            element={
              <PrivateRoute>
                <Play />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </CustomThemeProvider>
  );
}

export default App;
