import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../model/productModel';

interface CounterState {
  loading: Boolean;
  productDetails: Product | null;
  error: String;
}

const initialState: CounterState = {
  loading: false,
  productDetails: null,
  error: '',
};

export const productDetails = createSlice({
  name: 'productsDetails',
  initialState,
  reducers: {
    productDetailsRequest: (state) => {
      state.productDetails = null;
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      state.productDetails = action.payload;
      state.loading = false;
    },
    productDetailsRequestError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsRequestError,
} = productDetails.actions;
export default productDetails.reducer;
