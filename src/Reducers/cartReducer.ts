import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartProduct } from '../model/cartModel';

interface CounterState {
  cartItems: Array<CartProduct>;
  shippingAddress: { address: string, city: string, country: string, postalCode: number }
  paymentMethod: string | null;
  itemsPrice: number,
  shippingPrice: number,
  taxPrice: number,
  totalPrice: number
}

const initialState: CounterState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')!) || [],
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')!) || {},
  paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')!),
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0
};

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
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
    addPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    addPrices: (state, action) => {
      state.itemsPrice = action.payload.itemsPrice;
      state.shippingPrice = action.payload.shippingPrice;
      state.taxPrice = action.payload.taxPrice;
      state.totalPrice = action.payload.totalPrice;
    },
    cartClearItems:(state) => {
      state.cartItems = [];
    }
  },
});

export const { addToCart, removeItemFromCart, addShippingAddress, addPrices,addPaymentMethod,cartClearItems } = counterSlice.actions;
export default counterSlice.reducer;
