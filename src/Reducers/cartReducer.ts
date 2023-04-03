import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { CartProduct } from '../model/cartModel';

interface CounterState {
    cartItems: Array<CartProduct>;
}

const initialState: CounterState = {
    cartItems: [],
};

export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) =>
                x.id === item.id
            )
            if (existItem) {
                state.cartItems.map((x) =>
                    x.id === existItem.id ? item : x)
            } else {
                state.cartItems=[...state.cartItems,item];
            }
        },
        removeItemFromCart: (state, action) => {
            state.cartItems=state.cartItems.filter((x) => x.id !== action.payload.id)
        }

    },
})


export const { addToCart, removeItemFromCart } = counterSlice.actions
export default counterSlice.reducer