import { configureStore, type ThunkAction, type Action } from "@reduxjs/toolkit";
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch, type TypedUseSelectorHook } from "react-redux";
import { middleware } from "./middleware";
import global from "@/redux/slices/global";

// store
const rootReducer = {
  global,
};
export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

// types
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action>;

// hooks
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
