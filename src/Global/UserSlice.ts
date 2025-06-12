/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  User: any[];
  Token: string;
  Deposit: any[];
  Withdraw: any[];
  AllHistory: any[];
  Investment: any[];
  Image: string;
}

const initialState: UserState = {
  User: [],
  Token: "",
  Deposit: [],
  Withdraw: [],
  AllHistory: [],
  Investment: [],
  Image: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["User"]>) => {
      state.User = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.Token = action.payload;
    },
    setDeposit: (state, action: PayloadAction<UserState["Deposit"]>) => {
      state.Deposit = action.payload;
    },
    setWithdraw: (state, action: PayloadAction<UserState["Withdraw"]>) => {
      state.Withdraw = action.payload;
    },
    setAllHistory: (state, action: PayloadAction<UserState["AllHistory"]>) => {
      state.AllHistory = action.payload;
    },
    setInvestment: (state, action: PayloadAction<UserState["Investment"]>) => {
      state.Investment = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.Image = action.payload;
    },

    clearUser: (state) => {
      state.AllHistory = [];
      state.User = [];
      state.Deposit = [];
      state.Withdraw = [];
      state.Token = "";
      state.Investment = [];
      state.Image = "";
    },
  },
});

export const {
  setUser,
  setToken,
  setDeposit,
  setWithdraw,
  setAllHistory,
  setInvestment,
  clearUser,
  setImage,
} = UserSlice.actions;

export default UserSlice.reducer;
