import { createSlice } from '@reduxjs/toolkit';

// Retrieve theme from localStorage if it exists, otherwise default to 'light'
const initialTheme = localStorage.getItem('theme') || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: initialTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      // Toggle between 'light' and 'dark' theme
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      // Save the current theme in localStorage
      localStorage.setItem('theme', state.currentTheme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
