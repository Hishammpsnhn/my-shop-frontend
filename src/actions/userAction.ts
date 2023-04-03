import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import {
  logoutUser,
  registerUserfail,
  registerUserRequest,
  registerUserSucess,
} from '../Reducers/userReducer';

type props = {
  name?: String;
  email: String;
  password: String;
};

export const register =
  ({ name, email, password }: props) =>
  async (dispatch: Dispatch) => {
    dispatch(registerUserRequest());
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/users',
        { name, email, password },
        config
      );
      dispatch(registerUserSucess(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch(
        registerUserfail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const login =
  ({ email, password }: props) =>
  async (dispatch: Dispatch) => {
    dispatch(registerUserRequest());
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:4000/api/users/login',
        { email, password },
        config
      );
      dispatch(registerUserSucess(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch(
        registerUserfail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(logoutUser);
  document.location.href = '/login';
};
