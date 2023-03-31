import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Product } from '../model/productModel';

interface CounterState {
    loading: Boolean;
    products: Array<Product>;
    error: String;
    pages:Number,
    page:Number
}

const initialState: CounterState = {
    loading: false,
    products: [],
    error: "",
    pages: 0,
    page: 0
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
            state.products = action.payload.products
            state.page = action.payload.page
            state.pages = action.payload.pages

        },
        productListRequestError: (state, action) => {
            state.loading = true;
            state.error = action.payload

        },

    },
})


export const { productListRequest, productListSuccess, productListRequestError} = counterSlice.actions
export default counterSlice.reducer