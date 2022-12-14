import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const allClientsSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {
		addClient: (state, action) => {
			state.value.push(action.payload);
		},
		removeClient: (state, action) => {
			state.value = state.value.filter(client => client.name !== action.payload.name);
		},

	},
});

export const { addClient, removeClient } = allClientsSlice.actions;
export default allClientsSlice.reducer;