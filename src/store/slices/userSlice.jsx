import { createSlice } from "@reduxjs/toolkit";
import { fetchLoginUserData } from "../../https/user/account/userAccount";

const userSlice = createSlice({
  name: "userHeader",
  initialState: {},
  reducers: {
    autoLogin(state, action) {
      const token = localStorage.getItem("__token__");
      if (token) {
        state.login = true;
        state.token = action.payload;
      }
    },
    login(state, action) {
      localStorage.setItem("__token__", action.payload);
      state.login = true;
      state.token = action.payload;
    },
    loadUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    logout(state) {
      localStorage.removeItem("__token__");
      state.login = false;
      state.token = undefined;
      state.userInfo = undefined;
    },
  },
});

export default userSlice.reducer;

export const userAction = userSlice.actions;

export const userThunkAction = {
  loadUserInfo() {
    return (dispatcher) => {
      (async () => {
        const userData = await fetchLoginUserData();
        console.log(userData);
        if (userData?.status === 200) {
          dispatcher(userAction.loadUserInfo(userData.data));
        }
      })();
    };
  },
};
