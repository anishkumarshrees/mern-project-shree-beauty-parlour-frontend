import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import { APIWITHTOKEN } from "../http";
import type { AppDispatch } from "./store";
// import { setStatus } from "./authSlice";

export interface IUser{
    id : string,
    userName : string,
    email : string
}

export interface IInitialState{
    users : IUser[],
    status : Status
}

const initialState:IInitialState={
    users : [],
    status : Status.LOADING
}


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers :{
        setStatus(state:IInitialState,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setUsers(state:IInitialState,action:PayloadAction<IUser[]>){
            state.users = action.payload
        },
        deleteUser(state:IInitialState,action:PayloadAction<string>){
         const index =   state.users.findIndex((user)=>user.id === action.payload)
         if(index !==-1){
            state.users.splice(index,1)
         }
        }
    }
})

const { setStatus, setUsers ,deleteUser} = userSlice.actions
export default userSlice.reducer

export function fetchUsers(){
    return async function fetchUsersThunk(dispatch:AppDispatch){
       try {
         const response = await APIWITHTOKEN.get("/users")
        if(response.status===200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(setUsers(response.data.data))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
       } catch (error) {
        dispatch(setStatus(Status.ERROR))
       }
    }
}
export function deleteUserById(id:string){
    return async function fetchUserByIdThunk(dispatch:AppDispatch){
       try {
         const response = await APIWITHTOKEN.delete("/users/" + id)
        if(response.status===200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(deleteUser(id))
            // dispatch(setUsers(response.data.data))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
       } catch (error) {
        dispatch(setStatus(Status.ERROR))
       }
    }
}