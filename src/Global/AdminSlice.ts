import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    
}

const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers:{
        signIn(){

        }
    }
})
export const {signIn} = AdminSlice.actions
export default AdminSlice.reducer