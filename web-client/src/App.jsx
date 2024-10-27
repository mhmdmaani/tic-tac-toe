import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import Login from './pages/Login';
import CustomThemeProvider from './providers/CustomThemeProvider';
import { ReduxProvider } from '@tic-tac/shared';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ReduxProvider>
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
    </ReduxProvider>
  );
}

export default App;
