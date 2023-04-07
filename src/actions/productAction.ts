import axios from 'axios';
import { Dispatch } from 'redux';
import {
  productListRequest,
  productListRequestError,
  productListSuccess,
} from '../Reducers/productReducers';
import {
  productDetailsSuccess,
  productDetailsRequest,
  productDetailsRequestError,
} from '../Reducers/productDetailsReducer';
import { RootState } from '../store';
import { addReviewError, addReviewRequest, addReviewSucces } from '../Reducers/ReviewReducer';
import { logout } from './userAction';

export const listProducts =
  (keyword = '', pageNumber = '') =>
    async (dispatch: Dispatch) => {
      console.log(keyword);
      try {
        dispatch(productListRequest());
        const { data } = await axios.get(
          `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
        );
        dispatch(productListSuccess(data));
      } catch (error) {
        dispatch(productListRequestError(error));
      }
    };

export const listProductDetails =
  (id: string) => async (dispatch: Dispatch) => {
    dispatch(productDetailsRequest());
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(productDetailsSuccess(data));
    } catch (error) {
      dispatch(productDetailsRequestError(error));
    }
  };


export const createProductReview = (productId: string, review: { rating: number, comment: string }) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    dispatch(addReviewRequest())

    const { user: { user } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    }

    await axios.post(`/api/products/${productId}/reviews`, review, config)

    dispatch(addReviewSucces())
  } catch (error:any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    if (message === 'Not authorized, token failed') {
      logout(dispatch)
    }
    console.log(message)
    dispatch(addReviewError(message))
  }
}