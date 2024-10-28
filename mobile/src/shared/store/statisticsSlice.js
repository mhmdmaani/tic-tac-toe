// statisticsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Stats } from '../api/Stats';

// Async thunk to fetch statistics data
export const fetchStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Stats.getUserStats();
      if (!data) {
        throw new Error('Failed to fetch statistics');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: {
    stats: {
      wins: 0,
      losses: 0,
      draws: 0,
    },
  },
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearStatistics: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the clearStatistics action and reducer
export const { clearStatistics } = statisticsSlice.actions;
export default statisticsSlice.reducer;
