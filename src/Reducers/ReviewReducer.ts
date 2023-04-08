import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartProduct } from '../model/cartModel';
import { orderItems } from '../model/orderModel';
import { stat } from 'fs';

interface CounterState {
  loading: Boolean;
  error: String;
  success: boolean;
}
const initialState: CounterState = {
  loading: false,
  error: '',
  success: false,
};

export const counterSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReviewRequest: (state) => {
      state.loading = true;
    },
    addReviewSucces: (state) => {
      state.loading = false;
      state.success = true;
    },
    addReviewError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    reviewReset: (state) => {
      state.error = '';
      state.loading = false;
      state.success = false;
    },
  },
});

export const {
  addReviewError,
  addReviewRequest,
  addReviewSucces,
  reviewReset,
} = counterSlice.actions;
export default counterSlice.reducer;
