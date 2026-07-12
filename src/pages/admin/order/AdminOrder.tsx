import { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import AdminOrderTable from "./component/AdminOrderTable";
import { fetchmyOrders } from "../../../store/adminOrderSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";


function AdminOrder(){
     const dispatch = useAppDispatch()
        const {items} = useAppSelector((store)=>store.adminOrder)
      useEffect(()=>{
        // fetchProducts expects one argument; pass a placeholder when none is needed
        dispatch(fetchmyOrders())
      },[])
    return(
<AdminLayout>
<AdminOrderTable orders={items} />
</AdminLayout>
    )
}
export default AdminOrder