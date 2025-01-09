import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartItemState } from "../../types/types";

const initialState: CartItemState = {
  item: [],
  totalPrice: 0,
};

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price! * item.count, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.item.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.count += action.payload.count;
      } else {
        state.item.push(action.payload);
      }
      state.totalPrice = calculateTotalPrice(state.item);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.item.find((item) => item.id === action.payload.id);
      if (item) {
        item.count = action.payload.quantity;
      }
      state.totalPrice = calculateTotalPrice(state.item);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.item);
    },
  },
});

export const CartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
