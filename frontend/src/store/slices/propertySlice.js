import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Async thunks
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchPropertyById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createProperty = createAsyncThunk(
  'properties/createProperty',
  async (propertyData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(
        `${API_BASE_URL}/properties`,
        propertyData,
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

export const updateProperty = createAsyncThunk(
  'properties/updateProperty',
  async ({ id, propertyData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(
        `${API_BASE_URL}/properties/${id}`,
        propertyData,
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

export const deleteProperty = createAsyncThunk(
  'properties/deleteProperty',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${API_BASE_URL}/properties/${id}`, {
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

export const searchProperties = createAsyncThunk(
  'properties/searchProperties',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties/search`, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  properties: [],
  currentProperty: null,
  isLoading: false,
  error: null,
  searchFilters: {
    location: '',
    priceRange: [0, 1000],
    guests: 1,
    checkIn: null,
    checkOut: null,
  },
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchFilters: (state, action) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
    clearSearchResults: (state) => {
      state.properties = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch property by ID
      .addCase(fetchPropertyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProperty = action.payload;
        state.error = null;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create property
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties.push(action.payload);
        state.error = null;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update property
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.properties.findIndex(
          (property) => property.id === action.payload.id
        );
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        state.currentProperty = action.payload;
      })
      // Delete property
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(
          (property) => property.id !== action.payload
        );
      })
      // Search properties
      .addCase(searchProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(searchProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setSearchFilters, clearCurrentProperty, clearSearchResults } = propertySlice.actions;
export default propertySlice.reducer;