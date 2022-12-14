import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const scenarioSlice = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    addId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addId } = scenarioSlice.actions;
export default scenarioSlice.reducer;
