import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import mainHeaderReducer from "./slices/mainHeaderSlice.jsx";

export const Toolkit = ({ children }) => {
  const store = configureStore({
    reducer: {
      header: mainHeaderReducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};
