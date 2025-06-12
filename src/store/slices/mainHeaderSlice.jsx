import { createSlice } from "@reduxjs/toolkit";

const mainHeaderSlice = createSlice({
  name: "mainHeader",
  initialState: [],
  reducers: {
    init(state, action) {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },
  },
});

export default mainHeaderSlice.reducer;

export const mainHeaderAction = mainHeaderSlice.actions;
