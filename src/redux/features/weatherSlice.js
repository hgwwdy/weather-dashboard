import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../../api/weatherApi";

// Async thunk to fetch weather data
export const getWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
  const data = await fetchWeather(city);
  return data;
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, loading: false, error: null },
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
      })
      .addCase(getWeather.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch weather data";
      });
  },
});

export default weatherSlice.reducer;
