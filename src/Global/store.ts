import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AdminSlice from "../Global/AdminSlice";
import UserSlice from "../Global/UserSlice";
import DropdownSlice from "../Global/Function";
const rootReducer = combineReducers({
  admin: AdminSlice,
  user: UserSlice,
  dropdown: DropdownSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["admin", "user", "dropdown"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
