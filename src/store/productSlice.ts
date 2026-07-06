import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProducts } from "../pages/product/types";
import { Status } from "../globals/types/type";
import { API } from "../http";
import type { AppDispatch, RootState } from "./store";



const initialState: IProducts = {
  products: [],
  status: Status.LOADING,
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state: IProducts, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setStatus(state: IProducts, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProduct(state: IProducts, action: PayloadAction<IProduct | null>) {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setStatus, setProduct } = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductThunk(dispatch: AppDispatch) {
    
    try {
      const response = await API.get("/product");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProducts(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.error(error);
    }
  };
}

export function fetchProduct(id: string) {
    
  return async function fetchProductThunk(dispatch: AppDispatch,getState:()=>RootState) {
   const store = getState()
  const productExists = store.product.products.find((product:IProduct)=>product.id === id)
  if(productExists){
    dispatch(setProduct(productExists))
    dispatch(setStatus(Status.SUCCESS))
  }
  else{
 try {
      const response = await API.get("/product/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        const data = response.data.data;
        dispatch(setProduct(Array.isArray(data) ? (data[0] ?? null) : data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.error(error);
    }
  }
   
  };
}
