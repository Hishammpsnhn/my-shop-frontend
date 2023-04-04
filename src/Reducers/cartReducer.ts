import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartProduct } from '../model/cartModel';

interface CounterState {
  cartItems: Array<CartProduct>;
  shippingAddress: { address: string, city: string, country: string, postalCode: number }
}

const initialState: CounterState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')!) || [],
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')!) || {}
};

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log(item);
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        console.log('existing item');
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.id !== action.payload.id
      );
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
    },
  },
});

export const { addToCart, removeItemFromCart, addShippingAddress } = counterSlice.actions;
export default counterSlice.reducer;
