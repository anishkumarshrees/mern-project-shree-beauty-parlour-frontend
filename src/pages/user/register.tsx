import { useAppDispatch, useAppSelector } from "../../store/hooks"
import store from "../../store/store"




function Register(){
    const data = useAppSelector((store)=>store.user)
    console.log(data)
    return(
        <>
        <h1>Register page</h1>
        </>
    )
}

export default Register