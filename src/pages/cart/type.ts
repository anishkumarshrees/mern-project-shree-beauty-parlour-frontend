import type { Status } from "../../globals/types/type";
import type { IProduct } from "../product/types";

export interface ICartProduct {
  id: string;
  productName: string;
  productImage: string;
  productPrice: number;
}

export interface ICartItem {
  id: string;
  quantity: number;
  productId: string;
  product: ICartProduct;
}

export interface ICartInitialState {
  items: ICartItem[];
  status: Status;
}

export interface ICartUpdateItem{
    productId : string,
    quantity : number
}
