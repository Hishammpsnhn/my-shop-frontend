import axios from 'axios';
import { Dispatch } from 'redux';
import {
  productDeleteSuccess,
  productListRequest,
  productListRequestError,
  productListSuccess,
} from '../Reducers/productReducers';
import {
  productDetailsSuccess,
  productDetailsRequest,
  productDetailsRequestError,
  productUpdateSuccess,
} from '../Reducers/productDetailsReducer';
import { RootState } from '../store';
import {
  addReviewError,
  addReviewRequest,
  addReviewSucces,
} from '../Reducers/ReviewReducer';
import { logout } from './userAction';
import { Product } from '../model/productModel';

export interface UpdateProduct {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
}

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch: Dispatch) => {
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

export const createProductReview =
  (productId: string, review: { rating: number; comment: string }) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(addReviewRequest());

      const {
        user: { user },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch(addReviewSucces());
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === 'Not authorized, token failed') {
        logout(dispatch);
      }
      dispatch(addReviewError(message));
    }
  };
export const deleteProduct =
  (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(productListRequest());

      const {
        user: { user },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);

      dispatch(productDeleteSuccess());
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === 'Not authorized, token failed') {
        logout(dispatch);
      }
      dispatch(productListRequestError(message));
    }
  };

export const updateProduct =
  (product: UpdateProduct) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(productDetailsRequest());

      const {
        user: { user },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch(productUpdateSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (message === 'Not authorized, token failed') {
        logout(dispatch);
      }
      dispatch(productDetailsRequestError(message));
    }
  };
