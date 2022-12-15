import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const clientSlice = createSlice({
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

export const { addClient, removeClient } = clientSlice.actions;
export default clientSlice.reducer;