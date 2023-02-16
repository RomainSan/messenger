import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getRooms: (state, action) => {
      state.rooms = action.payload;
    },
    getMessages: (state, action) => {
      state.message = action.payload;
    },
    clearState: (state, action) => {
      state.message = initialState;
      state.rooms = initialState;
    },
    setMessage: (state, action) => {
      state.message = false;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },

  
  },
});

export const { getRooms, getMessages, clearState, setMessage, setRoom } =
  messageSlice.actions;
export default messageSlice.reducer;
