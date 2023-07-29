import axios from 'axios';
import {
  addPaymentMethod,
  addShippingAddress,
  addToCart,
  removeItemFromCart,
} from '../Reducers/cartReducer';
import { Dispatch } from 'redux';
import { RootState } from '../store';
import { ShippingAddress } from '../model/shippingAddressModel';
import API_BASE_URL from '../config/config';

export const addItemToCart =
  (id: string, qty: number | null) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`);

    dispatch(
      addToCart({
        id: data._id,
        name: data.name,
        price: data.price,
        image: data.image,
        countInStock: data.countInStock,
        qty,
      })
    );
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeItem =
  (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    console.log(id)
    dispatch(removeItemFromCart({ id }));
    console.log(getState().cart.cartItems)
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const addAddress =
  (data: ShippingAddress) => async (dispatch: Dispatch) => {
    dispatch(addShippingAddress(data));
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

export const savePaymentMethod = (data: string) => (dispatch: Dispatch) => {
  dispatch(addPaymentMethod(data));

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
