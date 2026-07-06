import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct, IProducts } from "../pages/product/types";
import { Status } from "../globals/types/type";
import { API } from "../http";
import type { AppDispatch } from "./store";


const initialState:IProducts ={
    products : [],
    status : Status.LOADING
}

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setProduct(state:IProducts,action:PayloadAction<IProduct[]>){
            state.products = action.payload
           
        },
         setStatus(state:IProducts,action:PayloadAction<Status>){
            state.status = action.payload
         }
       
    }
})

export const {setProduct,setStatus} = productSlice.actions

export default productSlice.reducer


export function fetchProduct(){
    return async function fetchProductThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/product")
            if(response.data ===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setProduct(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
               
        } catch (error) {
            
        }
    }
}