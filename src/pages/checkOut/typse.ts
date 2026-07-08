import type { Status } from "../../globals/types/type";
import type { ICartProduct } from "../cart/type";


interface IProduct{
  productId : string,
  productQty : number,
  orderStatus? : string,
  totalAmount? : number,
  Payment? : {
    paymentMethod : PaymentMethod
  }
  productName? : string
}
export interface IOrderItems extends IProduct{
   
    id : string
}


export interface IOrder{
    status : Status,
    items : IOrderItems[],
    khaltiUrl : string | null

}
export enum PaymentMethod{
  Esewa = "esewa",
  Khalti = "khalti",
  Cod = "cod"

}

export interface IData{
  firstName : string,
  lastName : string,
  email : string,
  phoneNumber : string,
  city : string,
  addressLine : string,
  state : string,
  totalAmount : number,
  paymentMethod : PaymentMethod,
  products : IProduct[],

}