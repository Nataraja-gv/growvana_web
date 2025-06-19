import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../feature/userData";
import cartReducers from "../feature/totalCart";

const store = configureStore({
  reducer: {
    user: userInfoReducer,
    cart: cartReducers,
  },
});

export default store;
