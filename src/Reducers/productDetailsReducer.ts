import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../model/productModel';

interface CounterState {
  loading: Boolean;
  productDetails: Product | null;
  error: String;
  successUpdate: Boolean;
}

const initialState: CounterState = {
  loading: false,
  productDetails: null,
  error: '',
  successUpdate: false,
};

export const productDetails = createSlice({
  name: 'productsDetails',
  initialState,
  reducers: {
    productDetailsRequest: (state) => {
      state.productDetails = null;
      state.loading = true;
      state.error = '';
    },
    productDetailsSuccess: (state, action) => {
      state.productDetails = action.payload;
      state.loading = false;
    },
    productDetailsRequestError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    productUpdateSuccess: (state, action) => {
      state.loading = false;
      state.successUpdate = true;
      state.productDetails = action.payload;
    },
    resetUpdateOrder: (state) => {
      state.successUpdate = false;
    },
  },
});

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsRequestError,
  productUpdateSuccess,
  resetUpdateOrder,
} = productDetails.actions;
export default productDetails.reducer;
