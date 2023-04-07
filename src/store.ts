import { configureStore, createReducer } from '@reduxjs/toolkit';
import productReducers from './Reducers/productReducers';
import userReducer from './Reducers/userReducer';
import productDetailsReducer from './Reducers/productDetailsReducer';
import cartReducer from './Reducers/cartReducer';
import orderReducer from './Reducers/orderReducer';
import orderPayReducer from './Reducers/orderPayReducer';
import myOrderListReducers from './Reducers/myOrderListReducers';
import ReviewReducer from './Reducers/ReviewReducer';
import usersListReducers from './Reducers/usersListReducers';

export const store = configureStore({
  reducer: {
    product: productReducers,
    user: userReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    order:orderReducer,
    orderPay:orderPayReducer,
    myOrder:myOrderListReducers,
    review:ReviewReducer,
    usersList:usersListReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
