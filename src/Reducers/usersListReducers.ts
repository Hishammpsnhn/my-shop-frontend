import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartProduct } from '../model/cartModel';
import { orderItems } from '../model/orderModel';
import { stat } from 'fs';
type User = {
    name: string,
    email: string,
    isAdmin: boolean,
    _id: string,
}
interface CounterState {
    loading: Boolean;
    error: String;
    usersList: Array<User>;
    deleteUserSuccess: boolean;

}
const initialState: CounterState = {
    loading: false,
    error: "",
    usersList: [],
    deleteUserSuccess: false
};

export const counterSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        usersListRequest: (state) => {
            state.loading = true;
        },
        userListSucces: (state, action) => {
            state.loading = false;
            state.usersList = action.payload;
        },
        userListError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        userDeleteSuccess: (state) => {
            state.loading = false;
            state.deleteUserSuccess = true;
        }


    },
});

export const { userListError, usersListRequest, userListSucces, userDeleteSuccess } = counterSlice.actions;
export default counterSlice.reducer;


