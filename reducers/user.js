import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email: null, poste: null, interlocutors: [] , isAdmin: null},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.poste = action.payload.poste;
      state.value.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.poste = null;
      state.value.isAdmin = null;
    },
    addInterlocutor: (state,action) => {
      state.value.interlocutors.push(action.payload);
    },
    deleteInterlocutor: (state,action) => {
     state.value.interlocutors.splice(action.payload,1);
    }
  },
});

export const { login, logout, addInterlocutor,deleteInterlocutor } = userSlice.actions;
export default userSlice.reducer;
