import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const storageUser =  localStorage.getItem('userInfo')
const userInfoFromStorage = storageUser
  ? JSON.parse(storageUser)
  : null

const initialState: UserState = {
  user: userInfoFromStorage,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
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
    }
  },
});

export const { registerUserSucess, registerUserfail, registerUserRequest } = userSlice.actions;

export default userSlice.reducer;
