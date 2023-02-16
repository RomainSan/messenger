import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../features/messagesSlice";
import userReducer from "../features/userSlice";
export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
  },
});
