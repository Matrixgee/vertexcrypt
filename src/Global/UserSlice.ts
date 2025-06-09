import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        signIn(){

        }
    }
})
export const {signIn} = UserSlice.actions
export default UserSlice.reducer