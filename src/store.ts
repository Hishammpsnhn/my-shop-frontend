import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./Reducers/productReducers";
import userReducer from "./Reducers/userReducer";
import productDetailsReducer from "./Reducers/productDetailsReducer";

export const store = configureStore({
    reducer: {
        product: productReducers,
        user: userReducer,
        productDetails: productDetailsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch