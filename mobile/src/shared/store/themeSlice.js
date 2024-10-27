import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

// Retrieve theme from AsyncStorage (asynchronously)
const getInitialTheme = async () => {
  try {
    const savedTheme = await AsyncStorage.getItem('theme');
    return savedTheme || 'light';
  } catch (error) {
    console.error('Failed to fetch theme from storage', error);
    return 'light';
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: 'light', // Default theme initially
    isLoading: true, // To indicate if the theme is still loading from storage
  },
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      state.isLoading = false;
    },
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setTheme, toggleTheme, finishLoading } = themeSlice.actions;

// Async action to initialize the theme from storage
export const loadTheme = () => async (dispatch) => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    if (theme) {
      dispatch(setTheme(theme));
    } else {
      dispatch(finishLoading());
    }
  } catch (error) {
    console.error('Failed to load theme from storage', error);
    dispatch(finishLoading());
  }
};

// Async action to toggle the theme and save it to storage
export const toggleThemeAndSave = () => async (dispatch, getState) => {
  const currentTheme = getState().theme.currentTheme;
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  dispatch(toggleTheme());

  try {
    await AsyncStorage.setItem('theme', newTheme);
  } catch (error) {
    console.error('Failed to save theme to storage', error);
  }
};

export default themeSlice.reducer;
