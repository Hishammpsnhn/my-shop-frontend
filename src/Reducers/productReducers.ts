import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../model/productModel';

interface CounterState {
  loading: Boolean;
  products: Array<Product>;
  deleteProduct: Boolean;
  error: String;
  pages: number;
  page: number;
}

const initialState: CounterState = {
  loading: false,
  products: [],
  deleteProduct: false,
  error: '',
  pages: 0,
  page: 0,
};

export const counterSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productListRequest: (state) => {
      state.loading = true;
    },
    productListSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.error = '';
    },
    productListRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productDeleteSuccess: (state) => {
      state.loading = false;
      state.deleteProduct = true;
    },
  },
});

export const {
  productListRequest,
  productListSuccess,
  productListRequestError,
  productDeleteSuccess,
} = counterSlice.actions;
export default counterSlice.reducer;
