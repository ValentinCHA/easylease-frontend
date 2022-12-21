import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    addId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addId } = clientSlice.actions;
export default clientSlice.reducer;
