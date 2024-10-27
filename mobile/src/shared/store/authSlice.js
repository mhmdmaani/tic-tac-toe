import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = (() => {
  return { isAuthenticated: false, user: null, token: null };
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;

      if (token) {
        state.isAuthenticated = true;
        state.user = user;
        state.token = token;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
