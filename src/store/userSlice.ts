import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { user } from "./type";


const userInfo:user = {
    name : "admin"
}

const userSlice = createSlice({
  name: "user",
  initialState : userInfo,
  reducers: {
    setName(state:user,action:PayloadAction<string>){
        state.name = action.payload
    }
  }
});
//action 
export const {setName} = userSlice.actions

export default userSlice.reducer
