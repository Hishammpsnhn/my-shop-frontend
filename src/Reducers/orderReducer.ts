import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartProduct } from '../model/cartModel';
import { orderItems } from '../model/orderModel';

interface CounterState {
  loading: Boolean;
  error: String;
  order: orderItems | null;
  success: boolean;
}

const initialState: CounterState = {
  loading: false,
  error: '',
  success: false,
  order: null,
};

export const counterSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    createOrderError: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    resetOrder: (state) => {
      state.success =false ;
    },
  },
});

export const {
  createOrderRequest,
  createOrderError,
  createOrderSuccess,
  resetOrder,
} = counterSlice.actions;
export default counterSlice.reducer;
