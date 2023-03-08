import { Dispatch } from 'redux'
import { productListRequest, productListRequestError, productListSuccess } from '../Reducers/productReducers'

export const listProducts = () => async (dispatch: Dispatch) => {
    try {
        dispatch(productListRequest())
        //fetch the product list
        // updadte the product list reducer
        dispatch(productListSuccess([
            { id: 1, name: 'Product', description: "selected product" },
            { id: 2, name: 'Product2', description: "selected product2" }
        ]))
    } catch (error) {
        dispatch(productListRequestError(error))
    }
}