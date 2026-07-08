import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { IData, IOrder, IOrderItems } from "../pages/checkOut/typse";
// import { setStatus } from "./authSlice";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";

const innitialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
  orderDetails : []
};

const orderSlice = createSlice({
  name: "orders",
  initialState: innitialState,
  reducers: {
    setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setorderDetails(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setStatus(state: IOrder, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setKhaltiUrl(state: IOrder, action: PayloadAction<string>) {
      state.khaltiUrl = action.payload;
    },
    
  },
});

export default orderSlice.reducer;
const { setItems, setStatus, setKhaltiUrl,setorderDetails} = orderSlice.actions;

export function orderItem(data: IData) {
  return async function orderItemsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/order", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
        if (response.data.url) {
          dispatch(setKhaltiUrl(response.data.url));
          window.location.href = response.data.url
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchMyOrders(){
  return async function fetchMyOrdersThunk(dispatch:AppDispatch){
    try {
       const response = await APIWITHTOKEN.get("/order");
       if(response.status ===200){
      dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
       }else{
        dispatch(setStatus(Status.ERROR));
       }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  }
}
export function fetchMyOrdersDetails(id:string){
  return async function fetchMyOrdersDetailsThunk(dispatch:AppDispatch){
    try {
       const response = await APIWITHTOKEN.get("/order/" + id);
        console.log("API Response:", response.data);
       if(response.status ===200){
      dispatch(setStatus(Status.SUCCESS));
        dispatch(setorderDetails(response.data.data));
       }else{
        dispatch(setStatus(Status.ERROR));
       }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  }
}
