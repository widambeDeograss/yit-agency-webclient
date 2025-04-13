import {useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import {AppDispatcher, RootState} from "./Store";

export const useAppDispatch = () => useDispatch<AppDispatcher>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
