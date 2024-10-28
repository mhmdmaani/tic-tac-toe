import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode'; // Ensure correct import
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from '../api/Auth';

const saveTokenToAsyncStorage = async (token) => {
  try {
    await AsyncStorage.setItem('jwtToken', token);
  } catch (error) {
    console.error('Error saving token to AsyncStorage:', error);
  }
};

const removeTokenFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    console.error('Error removing token from AsyncStorage:', error);
  }
};

const getTokenFromAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    return token || null; // Return null if token doesn't exist
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage:', error);
    return null;
  }
};

const isTokenExpired = (token) => {
  if (!token || typeof token !== 'string') {
    return true;
  }
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const checkIsAuthenticated = async () => {
  const token = await getTokenFromAsyncStorage();
  return token && !isTokenExpired(token);
};

const getUserFromAsyncStorage = async () => {
  const token = await getTokenFromAsyncStorage();
  if (!token || isTokenExpired(token)) {
    return null;
  }
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await Auth.login(email, password);
      if (!data) {
        throw new Error('Login failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const data = await Auth.register(email, password, name);
      if (!data) {
        throw new Error('Registration failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      removeTokenFromAsyncStorage();
    },
    checkTokenExpiration: (state) => {
      const token = getTokenFromAsyncStorage();
      if (token && isTokenExpired(token)) {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        removeTokenFromAsyncStorage();
      }
    },
    setAuth: (state, action) => {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.isAuthenticated = true;
        state.user = user;
        state.token = token;
        state.loading = false;
        saveTokenToAsyncStorage(token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.isAuthenticated = true;
        state.user = user;
        state.token = token;
        state.loading = false;
        saveTokenToAsyncStorage(token);
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout, checkTokenExpiration, setAuth } = authSlice.actions;
export default authSlice.reducer;
