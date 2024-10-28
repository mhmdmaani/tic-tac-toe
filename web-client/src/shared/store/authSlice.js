import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import Auth from '../api/Auth';

const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('jwtToken', token);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('jwtToken');
};

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('jwtToken');
};

const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

const checkIsAuthenticated = () => {
  const token = getTokenFromLocalStorage();
  return token && !isTokenExpired(token);
};

const getUserFromLocalStorage = () => {
  const token = getTokenFromLocalStorage();
  const isValid = token && !isTokenExpired(token);
  if (!isValid) {
    return null;
  }
  console.log(jwtDecode(token));
  return jwtDecode(token);
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
  isAuthenticated: checkIsAuthenticated(),
  user: getUserFromLocalStorage(),
  token: getTokenFromLocalStorage(),
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
      removeTokenFromLocalStorage();
    },
    checkTokenExpiration: (state) => {
      const token = getTokenFromLocalStorage();
      if (token && isTokenExpired(token)) {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        removeTokenFromLocalStorage();
      }
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
        saveTokenToLocalStorage(token);
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
        saveTokenToLocalStorage(token);
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
