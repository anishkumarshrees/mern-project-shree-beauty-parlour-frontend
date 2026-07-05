import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch } from "./store";
import type { RootState } from "./store";

//useAppDispatch kunai action lai trigger garna ko lagi
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
//useAppDispatch = useDispatch+type

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector 
//useAppSelector = useSelector + type
//useAppSelector chai kunai data use garna lai