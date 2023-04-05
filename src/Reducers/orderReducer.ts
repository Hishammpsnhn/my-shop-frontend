import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartProduct } from '../model/cartModel';

interface CounterState {
    loading: Boolean;
    error: String ;
}

const initialState: CounterState = {
    loading: false,
    error: ""
};

export const counterSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrderRequest: (state) => {
            state.loading = true;
        },
        createOrderSuccess: (state,action) => {

        },
        createOrderError: (state,action) => {
            state.error = action.payload.error;
            state.loading = false;
        },
        

    },
});

export const { createOrderRequest,createOrderError,createOrderSuccess} = counterSlice.actions;
export default counterSlice.reducer;
