// src/Global/DropdownSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface DropdownState {
  isOpen: boolean;
}

const initialState: DropdownState = {
  isOpen: false,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeDropdown: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleDropdown, closeDropdown } = dropdownSlice.actions;

export default dropdownSlice.reducer;
