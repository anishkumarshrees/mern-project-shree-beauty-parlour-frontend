import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import axios from "axios";
// import { data } from "react-router-dom";
import type { AppDispatch } from "./store";
interface IUserLogin{
    email : string,
    password : string
}
interface IUser {

    username: string | null;
    email: string | null;
    password: string | null;
  
}

 interface IAuthState {
  user: IUser,
  status: Status;
}

const initalState:IAuthState = {
    user : {
        username : "",
        email : "",
        password : ""
    },status: Status.LOADING
}

const authSlice = createSlice({
    name : "auth",
    initialState : initalState,
    reducers:{
        setUser(state:IAuthState,action:PayloadAction<IUser>){
            state.user = action.payload
        },
        setStatus(state:IAuthState, action:PayloadAction<Status>){
            state.status = action.payload
        }
    }

})

export const {setStatus,setUser} =authSlice.actions
export default authSlice.reducer


export function registerUser(data:IUser){
    return async function registerUserThunk(dispatch:AppDispatch){
      try {
        const response = await axios.post("http://localhost:3000/api/register",data)
        console.log(response)
        if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
      } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
      }
    }
}

export function loginUser(data:IUserLogin){
    return async function loginUserThunk(dispatch:AppDispatch){
      try {
        const response = await axios.post("http://localhost:3000/api/login",data)
        console.log(response)
        if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
      } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
      }
    }
}

export function forgotPassword(data:{email : string}){
    return async function forgotPasswordThunk(dispatch:AppDispatch){
      try {
        const response = await axios.post("http://localhost:3000/api/forget-password",data)
        console.log(response)
        if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
      } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
      }
    }
}