import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "ab757cbd7a4d7a2ad695e130b3b07b79";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (city, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

      if (!response.ok) {
        throw new Error("City not found");  // Handle city not found error
      }

      const data = await response.json();
      return data;  // Return fetched weather data
    } catch (error) {
      return rejectWithValue(error.message);  // Pass the error message to Redux state
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,  // Store error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Store error message
      });
  },
});

export default weatherSlice.reducer;
