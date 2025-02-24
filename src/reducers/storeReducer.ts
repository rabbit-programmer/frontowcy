import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemInterface } from "../interfaces/itemInterface";

interface StoreState {
	chooseOptions: ItemInterface[];
}

const initialState: StoreState = {
	chooseOptions: JSON.parse(localStorage.getItem("chooseOptions") || '[]') as ItemInterface[],
};

const storeSlice = createSlice({
	name: "storeSelector",
	initialState,
	reducers: {
		changeOption: (state, action: PayloadAction<ItemInterface>) => {
			const index = state.chooseOptions.findIndex(
				(option) => option.id === action.payload.id
			);
			if (index !== -1) {
				state.chooseOptions.splice(index, 1);
			} else {
				state.chooseOptions.push(action.payload);
			}

			localStorage.setItem(
				"chooseOptions",
				JSON.stringify(state.chooseOptions)
			);
		},
	},
});

export const { changeOption } = storeSlice.actions;
export default storeSlice.reducer;
