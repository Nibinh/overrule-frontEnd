import { configureStore } from "@reduxjs/toolkit";
import getUser from "./userSlice";

export const store = configureStore({
  reducer: {
    users: getUser,
  },
});
