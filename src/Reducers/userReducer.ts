import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateProfile: boolean
}

const storageUser = localStorage.getItem('userInfo');
const userInfoFromStorage = storageUser ? JSON.parse(storageUser) : null;

const initialState: UserState = {
  user: userInfoFromStorage,
  loading: false,
  error: null,
  updateProfile:false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserRequest: (state) => {
      state.loading = true;
    },
    registerUserSucess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerUserfail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfile:(state)=>{
      state.updateProfile = true;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  registerUserSucess,
  registerUserfail,
  registerUserRequest,
  logoutUser,
  updateProfile
} = userSlice.actions;

export default userSlice.reducer;
