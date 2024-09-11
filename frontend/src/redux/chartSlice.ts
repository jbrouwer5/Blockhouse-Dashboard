// /src/redux/chartSlice.ts
'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ChartState {
  candlestickData: any;
  lineChartData: any;
  barChartData: any;
  pieChartData: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ChartState = {
  candlestickData: null,
  lineChartData: null,
  barChartData: null,
  pieChartData: null,
  status: 'idle',
};

export const fetchCandlestickData = createAsyncThunk('charts/fetchCandlestickData', async () => {
  const response = await axios.get('http://localhost:8000/api/candlestick-data/');
  return response.data;
});

export const fetchLineChartData = createAsyncThunk('charts/fetchLineChartData', async () => {
  const response = await axios.get('http://localhost:8000/api/line-chart-data/');
  return response.data;
});

export const fetchBarChartData = createAsyncThunk('charts/fetchBarChartData', async () => {
  const response = await axios.get('http://localhost:8000/api/bar-chart-data/');
  return response.data;
});

export const fetchPieChartData = createAsyncThunk('charts/fetchPieChartData', async () => {
  const response = await axios.get('http://localhost:8000/api/pie-chart-data/');
  return response.data;
});

const chartSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandlestickData.fulfilled, (state, action) => {
        state.candlestickData = action.payload;
      })
      .addCase(fetchLineChartData.fulfilled, (state, action) => {
        state.lineChartData = action.payload;
      })
      .addCase(fetchBarChartData.fulfilled, (state, action) => {
        state.barChartData = action.payload;
      })
      .addCase(fetchPieChartData.fulfilled, (state, action) => {
        state.pieChartData = action.payload;
      });
  },
});

export default chartSlice.reducer;
