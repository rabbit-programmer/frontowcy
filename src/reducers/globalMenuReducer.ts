import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalMenuEnum } from "../enums/GlobalMenuEnum.ts";

interface GlobalMenuState {
	option: GlobalMenuEnum;
}

const initialState: GlobalMenuState = {
	option: GlobalMenuEnum.CV,
};

const globalMenuSlice = createSlice({
	name: "globalMenuSelector",
	initialState,
	reducers: {
		selectOption: (state, action: PayloadAction<GlobalMenuEnum>) => {
			state.option = action.payload;
		},
	},
});

export const { selectOption } = globalMenuSlice.actions;
export default globalMenuSlice.reducer;
