import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeliveryState {
  activeDelivery: string;
}

const initialState: DeliveryState = {
  activeDelivery: "Regular",
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setActiveDelivery(state, action: PayloadAction<string>) {
      state.activeDelivery = action.payload;
    },
  },
});

export const { setActiveDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;