import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./type";

const productInfo:Product = {
    proudcts:[]
}

const productSlice = createSlice({
    name:"prouduct",
    initialState:productInfo,
    reducers:{
        setProduct(state:Product,actions:PayloadAction<Product>){
            state.proudcts = [{
               productName : "anish",
               qty : 1
            }]
        }
    }
})


const {setProduct} = productSlice.actions.setProduct

export default productSlice.reducer