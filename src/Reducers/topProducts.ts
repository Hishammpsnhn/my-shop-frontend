import { createSlice} from '@reduxjs/toolkit';
import { Product } from '../model/productModel';

interface TopProductstate {
  loading: Boolean;
  products: Array<Product>;
  error: String;
}

const initialState: TopProductstate = {
  loading: false,
  products: [],
  error: '',
};

export const TopProductSlice = createSlice({
  name: 'top_products',
  initialState,
  reducers: {
    topProductRequest: (state) => {
      state.loading = true;
    },
    topProducttSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    },
    topProductRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    topProductRequest,
    topProducttSuccess,
    topProductRequestError
} = TopProductSlice.actions;
export default TopProductSlice.reducer;