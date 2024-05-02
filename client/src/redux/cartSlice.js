import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cart
    : [],
  cartnum: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).cartnum
    : 0,
  subtotal: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).subtotal
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const temp = { ...action.payload, count: 1 };
      const index = state.cart.findIndex(
        (item) => item._id == action.payload._id
      );
      if (index >= 0) {
        state.cart[index].count += 1;
      } else {
        state.cart.push(temp);
      }
      state.cartnum += 1;
      state.subtotal = state.cart.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.price * currentItem.count,
        0
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart: state.cart,
          cartnum: state.cartnum,
          subtotal: state.subtotal,
        })
      );
    },
    removefromcart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item._id == action.payload._id
      );
      if (index >= 0) {
        if (state.cart[index].count > 1) {
          state.cart[index].count -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }
      state.cartnum -= 1;
      state.subtotal = state.cart.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.price * currentItem.count,
        0
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart: state.cart,
          cartnum: state.cartnum,
          subtotal: state.subtotal,
        })
      );
    },
    clearCart: (state) => {
      (state.cart = []), (state.cartnum = 0), (state.subtotal = 0);
      localStorage.removeItem("cart");
    },
  },
});

export const { addtocart, removefromcart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
