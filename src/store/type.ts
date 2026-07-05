export interface user{
    name : string
}

interface ProductInfo{
    productName : string,
    qty: number
}
export interface Product{
    proudcts : [] | ProductInfo
}