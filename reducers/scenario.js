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
    removeId : (state) => {
      state.value = '';
    },
  },
});

export const { addId, removeId } = scenarioSlice.actions;
export default scenarioSlice.reducer;
