import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type  {Product } from "./type";

const productInfo: Product = {
  proudcts: [],
};

const productSlice = createSlice({
  name: "prouduct",
  initialState: productInfo,
  reducers: {
    setProduct(state: Product, action: PayloadAction<Product>) {
      state.proudcts = [
        
      ];
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
