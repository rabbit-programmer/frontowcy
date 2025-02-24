import { configureStore } from "@reduxjs/toolkit";
import globalMenuReducer from "./reducers/globalMenuReducer.ts";
import storeReducer from "./reducers/storeReducer.ts";

const store = configureStore({
	reducer: {
		globalMenuSelector: globalMenuReducer,
		storeSelector: storeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
