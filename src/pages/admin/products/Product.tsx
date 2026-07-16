import { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../../../store/adminProductSlice";
import ProductTable from "./component/ProductTable";



function AdminProduct(){
    const dispatch = useAppDispatch()
    const {products} = useAppSelector((store)=>store.adminProducts)
  useEffect(()=>{
    // fetchProducts expects one argument; pass a placeholder when none is needed
    dispatch(fetchProducts())
  },[dispatch])
    return(
       
           <ProductTable products ={products}/>
       
    )
}
export default AdminProduct