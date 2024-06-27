import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        loggedinUser:null,
    },
    reducers:{
        setLoggedinUser:(state,action)=>{
            state.loggedinUser=action.payload
        }
    }
})

export const {setLoggedinUser} = userSlice.actions
export default userSlice.reducer