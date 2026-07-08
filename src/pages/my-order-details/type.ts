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
export interface IOrderInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addressLine: string;
    city: string;
    state: string;
    totalAmount: number;
    orderStatus: OrderStatus;
    userId: string;
    Payment: {
        paymentMethod: PaymentMethod;
        paymentStatus: PaymentStatus;
    };
}

export interface IOrderDetails {
    id: string,
    quantity: number,
    createdAt: string,  
    orderId: string,
    productId: string,
    
    product : {
        productImage : string,
        productName : string,
        productPrice : number,
        Category :{
            categoryName : string
        }
    }
}