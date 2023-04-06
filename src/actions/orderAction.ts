import { Dispatch } from "redux";
import { createOrderRequest, createOrderSuccess, createOrderError, } from "../Reducers/orderReducer";
import { RootState } from "../store";
import axios from "axios";
import { userInfo } from "os";
import { cartClearItems } from "../Reducers/cartReducer";
import { logout } from "./userAction";
import { orderItems } from "../model/orderModel";
import { orderPayFail, orderPayRequest, orderPaySuccess } from "../Reducers/orderPayReducer";
import { myOrderRequest,myOrderSuccess,myOrderError } from "../Reducers/myOrderListReducers";

export const createOrder = (order: orderItems) => async (dispatch: Dispatch, getState: () => RootState) => {
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
        console.log(data)
        dispatch(createOrderSuccess(data))
        dispatch(cartClearItems())
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


export const getOrderDetails = (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        console.log("adfd")
        dispatch(createOrderRequest())

        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)
console.log(data)
        dispatch(createOrderSuccess(data))
    } catch (error:any) {
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

export const payOrder = (orderId:string, paymentResult:any) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(orderPayRequest())

        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        }
        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
          )
      

        dispatch(orderPaySuccess(data))
    } catch (error:any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        if (message === 'Not authorized, token failed') {
            logout(dispatch)
        }
        dispatch(orderPayFail(message))
    }
}

export const deliverOrder = (order:orderItems) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(createOrderRequest())

        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        }
        const { data } = await axios.put(
            `/api/orders/${order?._id}/deliver`,
            order,
            config
          )
      

        dispatch(createOrderSuccess(data))
    } catch (error:any) {
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

export const listMyOrders = () => async (dispatch: Dispatch, getState: () => RootState) => {
    console.log("called listMyOrders()")
    try {
         dispatch(myOrderRequest())

        const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        }
        const { data } = await axios.get(
            `/api/orders/myorders`,
            config
          )
            console.log("data",data)
        dispatch(myOrderSuccess(data))
    } catch (error:any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        if (message === 'Not authorized, token failed') {
            logout(dispatch)
        }
        dispatch(myOrderError(message))
    }
}