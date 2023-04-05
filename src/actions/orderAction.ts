import { Dispatch } from "redux";
import { createOrderRequest, createOrderSuccess, createOrderError } from "../Reducers/orderReducer";
import { RootState } from "../store";
import axios from "axios";
import { userInfo } from "os";
import { cartClearItems } from "../Reducers/cartReducer";
import { logout } from "./userAction";

export const createOrder = (order: any) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(createOrderRequest)
        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        }

        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch(createOrderSuccess(data))
        dispatch(cartClearItems)
        localStorage.removeItem('cartItems')

    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        if (message === 'Not authorized, token failed') {
           logout(dispatch)
        }
         dispatch(createOrderError(message))
    }
}