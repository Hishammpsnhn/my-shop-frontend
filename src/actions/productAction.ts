import axios from 'axios'
import { Dispatch } from 'redux'
import { productListRequest, productListRequestError, productListSuccess } from '../Reducers/productReducers'

export const listProducts = (keyword = "", pageNumber = "") => async (dispatch: Dispatch) => {
    try {
        dispatch(productListRequest())
        const { data } = await axios.get(
            `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
        )
        dispatch(productListSuccess(data))
    } catch (error) {
        dispatch(productListRequestError(error))
    }
}