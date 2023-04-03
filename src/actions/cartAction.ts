import axios from "axios"
import { addToCart, removeItemFromCart } from "../Reducers/cartReducer"
import { Dispatch } from "redux"
import { RootState } from "../store"

export const addItemToCart = (id: string, qty: number | null) => async (dispatch: Dispatch, getState: () => RootState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    console.log(id, qty)
    dispatch(addToCart({
        id: data._id,
        name: data.name,
        price: data.price,
        image: data.image,
        countInStock: data.countInStock,
        qty,
    }))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItem = (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(removeItemFromCart({ id }))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}