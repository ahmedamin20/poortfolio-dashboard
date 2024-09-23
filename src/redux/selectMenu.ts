import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectMenuType } from "../types/api.ts";

interface SelectMenuInterface {
    gemTypes: { data: SelectMenuType[], loading: boolean },
}
const initialState: SelectMenuInterface = {
    gemTypes: { data: [], loading: false }
}

export const selectMenuSlice = createSlice({
    name: 'selectMenu',
    initialState,
    reducers: {

        setGemTypesMenuLoading: (state, action: PayloadAction<boolean>) => {
            state.gemTypes.loading = action.payload;
        },
    }
})

export default selectMenuSlice.reducer;
export const {
    setGemTypesMenuLoading,

} = selectMenuSlice.actions;