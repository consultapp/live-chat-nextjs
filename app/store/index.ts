import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./dataSlice";
// ...

export const store = configureStore({
  reducer: {
    dataSlice: dataReducer,
    // users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
