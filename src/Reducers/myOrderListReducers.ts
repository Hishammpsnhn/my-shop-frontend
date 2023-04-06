import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartProduct } from '../model/cartModel';
import { orderItems } from '../model/orderModel';

interface CounterState {
    loading: Boolean;
    error: String ;
    orders: [orderItems]|[];
}
const initialState: CounterState = {
    loading: false,
    error: "",
    orders: [],
};

export const counterSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        myOrderRequest: (state) => {
            state.loading = true;
        },
        myOrderSuccess: (state,action) => {
            state.loading = false;
            state.orders = action.payload
        },
        myOrderError: (state,action) => {
            state.error = action.payload.error;
            state.loading = false;
        },
        

    },
});

export const {myOrderError,myOrderRequest,myOrderSuccess} = counterSlice.actions;
export default counterSlice.reducer;
