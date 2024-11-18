import { configureStore } from '@reduxjs/toolkit';
import globalMenuReducer from "./reducers/globalMenuReducer.ts";

const store = configureStore({
    reducer: {
        globalMenuSelector: globalMenuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;