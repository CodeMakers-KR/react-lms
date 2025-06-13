import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import mainHeaderReducer from "./slices/mainHeaderSlice.jsx";
import userReducer from "./slices/userSlice.jsx";

export const Toolkit = ({ children }) => {
  const store = configureStore({
    reducer: {
      header: mainHeaderReducer,
      user: userReducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};
