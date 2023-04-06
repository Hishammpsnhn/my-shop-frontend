import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import {
  logoutUser,
  registerUserfail,
  registerUserRequest,
  registerUserSucess,
} from '../Reducers/userReducer';
import { RootState } from '../store';

type Props = {
  name?: String;
  email: String;
  password: String;
};

export const register =
  ({ name, email, password }: Props) =>
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
  ({ email, password }: Props) =>
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

export const logout = (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(logoutUser);
  document.location.href = '/login';
};

export const getUserDetails = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(registerUserRequest());
  try {
    const { user: { user } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
            },
        }
    const { data } = await axios.get(
      '/api/users/profile', config
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
}
export const updateUserProfile = ({name,email,password}:Props) => async (dispatch:Dispatch,  getState: () => RootState) => {
    dispatch(registerUserRequest());
    try {
      const { user: { user } } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.token}`,
          },
      }
        const { data } = await axios.put(
          `/api/users/profile`,{email,name,password},config
        )
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
  }