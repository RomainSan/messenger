import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getTheme: (state, action) => {
      state.theme = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { getTheme, setTheme } = userSlice.actions;
export default userSlice.reducer;
