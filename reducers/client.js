import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const contratSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    addId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addId } = contratSlice.actions;
export default contratSlice.reducer;
