import { configureStore } from "@reduxjs/toolkit";
import CrudSlice from "../slices/CrudSlice";
export const store = configureStore({
    reducer:{crud:CrudSlice }
})