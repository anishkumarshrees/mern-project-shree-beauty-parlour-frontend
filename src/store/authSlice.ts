import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import axios from "axios";
// import { data } from "react-router-dom";
import type { AppDispatch } from "./store";
import { API } from "../http";
interface IUserLogin{
    email : string,
    password : string
}
interface IUser {

    userName: string | null;
    email: string | null;
    password: string | null;
    token : string | null
  
}

 interface IAuthState {

  user: IUser,
  status: Status;
}

const initalState:IAuthState = {
    user : {
        userName : null,
        email : null,
        password : null,
        token : null
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
        },
        setToken(state:IAuthState,action:PayloadAction<string>){
            state.user.token = action.payload
        }
    }

})

export const {setStatus,setUser,setToken} =authSlice.actions
export default authSlice.reducer


export function registerUser(data:IUser){
    return async function registerUserThunk(dispatch:AppDispatch){
      try {
        const response = await API.post("/auth/register",data)
        console.log(response)
        if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(setUser(response.data.data))
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
        const response = await API.post("/login",data)
        console.log(response)
        if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
            if(response.data.token){
 localStorage.setItem("thisistoken",response.data.token)
          dispatch(setToken(response.data.token))
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }
           
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
        const response = await API.post("/auth/forget-password",data)
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