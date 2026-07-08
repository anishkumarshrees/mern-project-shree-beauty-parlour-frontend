import type { PaymentMethod } from "../checkOut/typse"

export enum OrderStatus{
    preparation = "preparation",
    ontheway = "On the way",
    Delivered = " Delivered",
    Pending = "Pending",
    Cancelled = "Cancelled"
}
export enum  PaymentStatus{
    Paid = 'paid',
    Unpaid = 'unpaid'
}

export interface IOrderDetails {
    id : string,
    quantitiy : number,
    createdAt : string,
    orderId : string,
    productId : string,
    Order : {
        orderStatus : OrderStatus,
        addressLine : string,
        city : string,
        state : string,
        totalAmount : number,
        phoneNumber : number,
        Payment : {
            paymentMethod : PaymentMethod,
            paymentStatus : PaymentStatus
        }

    },
    Product : {
        productImage : string,
        productName : string,
        productPrice : string,
        Category :{
            categoryName : string
        }
    }
}