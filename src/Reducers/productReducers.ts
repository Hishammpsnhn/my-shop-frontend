import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Product } from '../model/productModel';

interface CounterState {
    loading: boolean;
    products: Array<Product>;
    error: string;
}

const initialState: CounterState = {
    loading: false,
    products: [],
    error: ""
};

export const counterSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productListRequest: (state) => {
            state.loading = true;
            state.products = []
        },
        productListSuccess: (state, action: PayloadAction< Array<Product>>) => {
            state.loading = false;
            state.products = action.payload

        },
        productListRequestError: (state, action) => {
            state.loading = true;
            state.error = action.payload

        }

    },
})


export const { productListRequest, productListSuccess, productListRequestError } = counterSlice.actions
export default counterSlice.reducer