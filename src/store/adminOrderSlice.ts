import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type {  PaymentMethod } from "../pages/checkOut/typse";

// import { setStatus } from "./authSlice";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import type {  IOrderDetails, PaymentStatus } from "../pages/my-order-details/type";

export interface IOrderInfo {
  id: string;
  orderStatus: string;
  addressLine: string;
  city: string;
  state: string;
  totalAmount: number;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  Payment: {
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
  };
}

export interface IAdminOrder{
id: string,
  productQty : number,
  orderStatus? : string,
  totalAmount? : number,
  Payment? : {
    paymentMethod : PaymentMethod,
    paymentStatus : PaymentStatus
  }
  productName? : string
}
export interface IOrderItems extends IAdminOrder{
   
    id : string,
    orderId : string
}

interface IInitalState{
    items : IAdminOrder[],
    status: Status,
    orderDetails : IOrderDetails[],
    order : IOrderInfo | null
    
}

const innitialState: IInitalState = {
  status: Status.LOADING,
  items: [],
  order : null ,
  orderDetails : [],
  
};

const orderSlice = createSlice({
  name: "adminOrder",
  initialState: innitialState,
  reducers: {
    setItems(state: IInitalState, action: PayloadAction<IAdminOrder[]>) {
      state.items = action.payload;
    },
    setorderDetails(state: IInitalState, action: PayloadAction<IOrderDetails[]>) {
      state.orderDetails = action.payload;
    },
    setStatus(state: IInitalState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setOrder(state, action: PayloadAction<IOrderInfo>) {
    state.order = action.payload;
}
    // setKhaltiUrl(state: IOrder, action: PayloadAction<string>) {
    //   state.khaltiUrl = action.payload;
    // },
//    updateOrderStatusToCancel(
//   state: IOrder,
//   action: PayloadAction<{ orderId: string }>
// ) {
//   const orderId = action.payload.orderId;

//   state.items = state.items.map((item) =>
//     item.orderId === orderId
//       ? { ...item, orderStatus: OrderStatus.Cancelled }
//       : item
//   );

  // ⭐ Update the currently opened order
//   if (state.order && state.order.id === orderId) {
//     state.order.orderStatus = OrderStatus.Cancelled;
//   }
// },
//     setOrder(state: IOrder, action: PayloadAction<IOrderInfo>) {
//   state.order = action.payload;
// },
    
  },
});

export default orderSlice.reducer;
const { setItems, setStatus, setorderDetails,setOrder} = orderSlice.actions;

export function fetchmyOrders() {
  return async function fetchOrdersmyThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("/orders/all");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
        
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchAdminOrderDetail(id: string){
  return async function fetchAdminOrderDetailThunk(dispatch:AppDispatch){
    try {
       const response = await APIWITHTOKEN.get("/orders/" + id);
       if(response.status ===200){
      dispatch(setStatus(Status.SUCCESS));
        dispatch(setorderDetails(response.data.data));
         dispatch(setOrder(response.data.order));
       }else{
        dispatch(setStatus(Status.ERROR));
       }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  }
}
// export function fetchMyOrdersDetails(id:string){
//   return async function fetchMyOrdersDetailsThunk(dispatch:AppDispatch){
//     try {
//        const response = await APIWITHTOKEN.get("/order/" + id);
//        console.log("Entire Response:", response.data);
//       console.log("Order Object:", response.data.order);
//         console.log("API Response:", response.data);
//        if(response.status ===200){
//       dispatch(setStatus(Status.SUCCESS));
//         dispatch(setOrder(response.data.order));
// dispatch(setorderDetails(response.data.data));
//        }else{
//         dispatch(setStatus(Status.ERROR));
//        }
//     } catch (error) {
//       dispatch(setStatus(Status.ERROR));
//     }
//   }
// }
// export function cancelOrderAPI(id:string){
//   return async function cancelOrderAPIThunk(dispatch:AppDispatch){
//     try {
//        const response = await APIWITHTOKEN.patch("/order/cancel-order/" + id);
//         console.log("API Response:", response.data);
//         console.log(response.data);
//        if(response.status ===200){
//       dispatch(setStatus(Status.SUCCESS));
//         dispatch(updateOrderStatusToCancel({
//           orderId : id
//         }));
//        }else{
//         dispatch(setStatus(Status.ERROR));
//        }
//     } catch (error) {
//       dispatch(setStatus(Status.ERROR));
//     }
//   }
// }