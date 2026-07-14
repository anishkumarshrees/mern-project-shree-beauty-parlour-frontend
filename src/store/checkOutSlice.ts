import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { IData, IOrder, IOrderItems } from "../pages/checkOut/typse";
import { OrderStatus, type IOrderDetails, type IOrderInfo } from "../pages/my-order-details/type";
// import { setStatus } from "./authSlice";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import { clearCart } from "./cartSlice";

const innitialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
  orderDetails : [],
  order : null
};

const orderSlice = createSlice({
  name: "orders",
  initialState: innitialState,
  reducers: {
    setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setorderDetails(state: IOrder, action: PayloadAction<IOrderDetails[]>) {
      state.orderDetails = action.payload;
    },
    setStatus(state: IOrder, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setKhaltiUrl(state: IOrder, action: PayloadAction<string>) {
      state.khaltiUrl = action.payload;
    },
   updateOrderStatusToCancel(
  state: IOrder,
  action: PayloadAction<{ orderId: string }>
) {
  const orderId = action.payload.orderId;

  state.items = state.items.map((item) =>
    item.orderId === orderId
      ? { ...item, orderStatus: OrderStatus.Cancelled }
      : item
  );

  // ⭐ Update the currently opened order
  if (state.order && state.order.id === orderId) {
    state.order.orderStatus = OrderStatus.Cancelled;
  }
},
    setOrder(state: IOrder, action: PayloadAction<IOrderInfo>) {
  state.order = action.payload;
},
updateOrderStatusSlice(state:IOrder,action:PayloadAction<{status:OrderStatus,userId:string,orderId:string}>){
  const {status,orderId} = action.payload
 const updateOrder = state.items.map((order)=>order.id === orderId ? {...order, orderStatus : status} : order)
 state.items= updateOrder
}
    
  },
});

export default orderSlice.reducer;
export const { setItems, setStatus, setKhaltiUrl,setorderDetails,updateOrderStatusToCancel,setOrder,updateOrderStatusSlice} = orderSlice.actions;

export function orderItem(data: IData) {
  return async function orderItemsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("/orders", data);
      if (response.status === 200) {
  dispatch(setStatus(Status.SUCCESS));
  dispatch(setItems(response.data.data));

  // Empty Redux cart
  dispatch(clearCart());

  // Redirect to payment gateway if needed
  if (response.data.url) {
    dispatch(setKhaltiUrl(response.data.url));
    window.location.href = response.data.url;
  }
}else {
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
       const response = await APIWITHTOKEN.get("/orders");
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
       const response = await APIWITHTOKEN.get("/orders/" + id);
      
        console.log("API Response:", response.data);
       if(response.status ===200){
      dispatch(setStatus(Status.SUCCESS));
        // dispatch(setOrder(response.data.order));
dispatch(setorderDetails(response.data.data));
       }else{
        dispatch(setStatus(Status.ERROR));
       }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  }
}
export function cancelOrderAPI(id:string){
  return async function cancelOrderAPIThunk(dispatch:AppDispatch){
    try {
       const response = await APIWITHTOKEN.patch("/orders/cancel-order/" + id);
        console.log("API Response:", response.data);
        console.log(response.data);
       if(response.status ===200){
      dispatch(setStatus(Status.SUCCESS));
        dispatch(updateOrderStatusToCancel({
          orderId : id
        }));
       }else{
        dispatch(setStatus(Status.ERROR));
       }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  }
}