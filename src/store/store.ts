import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import checkOutSlice  from "./checkOutSlice"
import adminCategorySlice from "./adminCategorySlice";
import adminUserSlice from "./adminUserSlice"
import adminProductSlice from "./adminProductSlice"

const store = configureStore({
    reducer : {
       auth : authSlice,
       product : productSlice,
       cart : cartSlice,
       orders : checkOutSlice,
       categories : adminCategorySlice,
       users : adminUserSlice,
       adminProducts : adminProductSlice
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>