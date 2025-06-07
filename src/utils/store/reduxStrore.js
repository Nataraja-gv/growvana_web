import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "../feature/userData";

const store = configureStore({
  reducer: {
    user: userInfoReducer,
  },
});

export default store;
