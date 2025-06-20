import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Async thunks
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${API_BASE_URL}/bookings/user`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(
        `${API_BASE_URL}/bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, bookingData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(
        `${API_BASE_URL}/bookings/${id}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${API_BASE_URL}/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update booking
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        state.currentBooking = action.payload;
      })
      // Cancel booking
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );
        if (state.currentBooking?.id === action.payload) {
          state.currentBooking = null;
        }
      });
  },
});

export const { clearError, setCurrentBooking, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;