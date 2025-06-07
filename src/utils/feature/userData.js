import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return  action.payload;
    },
    removeUser: (state, action) => {
     return null;
    },
  },
});


export const {addUser,removeUser}= userInfoSlice.actions;
export default userInfoSlice.reducer