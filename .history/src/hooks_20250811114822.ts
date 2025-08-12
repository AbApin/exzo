import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "./store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()