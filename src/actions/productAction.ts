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
