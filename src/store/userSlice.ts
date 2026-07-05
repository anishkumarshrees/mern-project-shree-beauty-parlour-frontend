import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { user } from "./type";


const userInfo:user = {
    name : "admin"
}

const userSlice = createSlice({
  name: "user",
  initialState : userInfo,
  reducers: {
    setName(state:user,action:PayloadAction<user>){
        state.name = "hahahaha"
    }
  }
});
//action 
const {} = userSlice.actions

export default userSlice.reducer
