import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email: null, poste: null, isAdmin: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.poste = action.payload.poste;
      state.value.isAdmin = action.payload.isAdmin
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.poste = null;
      state.value.isAdmin = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
