import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartLength: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartLength: (state, action) => {
      state.cartLength = action.payload;
    },
  },
});

export const { addCartLength } = cartSlice.actions;
export default cartSlice.reducer;
