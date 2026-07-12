import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { AppDispatch, RootState } from "./store";
import { API, APIWITHTOKEN } from "../http";



export interface IProductAdmin {
  id: string;
  productName: string;
  productPrice: number;
  productTotalStock: number;
  productDescription: string;
  discount: number;
  productImage: string;
  createAt: string;
  categoryId: string;
  Category: {
    categoryName: string;
  };
}
interface IProduct{
    id : string,
    categoryName : string
}
export interface ICreateProductPayload {
  id:string,
  productName: string;
  productPrice: number;
  productTotalStock: number;
  productDescription: string;
  discount: number;
  categoryId: string;
  productImage: File | null;
}

interface IInitalState {
  products: IProductAdmin[];
  status: Status;
  product: null | IProductAdmin;
  items : IProduct[]
}
const initialState: IInitalState = {
  products: [],
  status: Status.LOADING,
  product: null,
  items : []
};

const productSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    setStatus(state: IInitalState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProducts(state: IInitalState, action: PayloadAction<IProductAdmin[]>) {
      state.products = action.payload;
    },
    resetStatus(state: IInitalState) {
      state.status = Status.LOADING;
    },
    addProductToProducts(
      state: IInitalState,
      action: PayloadAction<IProductAdmin>,
    ) {
      state.products.push(action.payload);
    },
     deleteToProducts(state:IInitalState , action: PayloadAction<string>) {
           const index = state.products.findIndex(
             (item) => item.id === action.payload,
           );
           if (index !== -1) {
             state.products.splice(index, 1);
           }
         },
         productStatus(state:IInitalState){
           state.status = Status.LOADING;
         },
         setProduct(state: IInitalState, action: PayloadAction<IProductAdmin | null>) {
               state.product = action.payload;
             },
  },
});

export const { setStatus, setProducts, resetStatus, addProductToProducts,deleteToProducts,setProduct } =
  productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/product");
      console.log("fetchProducts response:", response.data);
      if (response.status === 200) {
        // dispatch(setStatus(Status.SUCCESS));
        dispatch(setProducts(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function addProducts(data: ICreateProductPayload) {
  return async function addProductsThunk(dispatch: AppDispatch) {
    try {
      const formData = new FormData();

      formData.append("productName", data.productName);
      formData.append("productDescription", data.productDescription);
      formData.append("productTotalStock", String(data.productTotalStock));
      formData.append("productPrice", String(data.productPrice));
      formData.append("discount", String(data.discount));
      formData.append("categoryId", data.categoryId);

      if (data.productImage) {
        formData.append("productImage", data.productImage);
      }

      const response = await APIWITHTOKEN.post("/product", formData);
      console.log("fetchProducts response:", response.data);
      if (response.status >= 200 && response.status < 300) {
        await dispatch(fetchProducts());
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteProducts(productId : string) {
  return async function deleteProductsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("/product/" + productId);
      console.log("fetchProducts response:", response.data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(deleteToProducts(productId));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchProductAdmin(id: string) {
    
  return async function fetchProductAdminThunk(dispatch: AppDispatch,getState:()=>RootState) {
   const store = getState()
  const productExists = store.adminProducts.products.find((product:IProductAdmin)=>product.id === id)
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
