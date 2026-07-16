import { useEffect } from "react"
// import AdminLayout from "../AdminLayout"
import { fetchProductAdmin } from "../../../store/adminProductSlice"
import { useAppDispatch } from "../../../store/hooks"
import { useParams } from "react-router-dom"



function ProductDescription(){
    const dispatch = useAppDispatch()
    const {id} = useParams()
   //  const {product} = useAppSelector((store)=>store.adminProducts)
    useEffect(()=>{
       id && dispatch(fetchProductAdmin(id))
    },[])
return(
   
  <>
  </>
  
)
}
export default ProductDescription