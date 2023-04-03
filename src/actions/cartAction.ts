import axios from "axios"
import { addToCart,removeItemFromCart } from "../Reducers/cartReducer"
import { Dispatch } from "redux"

export const addItemToCart = (id:string, qty:string|null) => async (dispatch:Dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(addToCart({
        id: data._id,
        name: data.name,
        price: data.price,
        image:data.image,
        countInStock: data.countInStock,
        qty,
    }))
}

export const removeItem=(id:string) => async (dispatch:Dispatch) =>{
    dispatch(removeItemFromCart({id}))
}