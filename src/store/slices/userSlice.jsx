import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userHeader",
  initialState: {},
  reducers: {
    login(state, action) {
      state.login = true;
    },
    logout(state, action) {
      state.login = false;
    },
  },
});

export default userSlice.reducer;

export const userAction = userSlice.actions;
