import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../model/productModel';

interface CounterState {
  loading: Boolean;
  success: Boolean;
  error: String;
}

const initialState: CounterState = {
  loading: false,
  success: false,
  error: '',
};

export const productDetails = createSlice({
  name: 'orderPay',
  initialState,
  reducers: {
    orderPayRequest: (state) => {
      state.loading = true;
    },
    orderPaySuccess: (state, action) => {
      state.success = true;
      state.loading = false;
    },
    orderPayFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { orderPayFail, orderPayRequest, orderPaySuccess } =
  productDetails.actions;
export default productDetails.reducer;
