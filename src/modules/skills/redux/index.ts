import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultNonPaginatedState } from "../../../utility/helpers/reduxHelper";
import SkillState from "../interfaces/skillState.ts";
import SkillObject from "../interfaces/skillObject.ts";
import SkillTableObject from "../interfaces/skillTableObject.ts";

const initialState: SkillState = defaultNonPaginatedState()
export const skillSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        setAllSkillsAction: (state, action: PayloadAction<SkillTableObject[]>) => {
            state.all.data = action.payload;
        },
        setAllSkillsLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.all.loading = action.payload;
        },
        setOneSkillAction: (state, action:  PayloadAction<SkillObject>) => {
            state.show.data = action.payload;
        },
        setOneSkillLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.show.loading = action.payload;
            console.log(action.payload)
        }
    }
})

export default skillSlice.reducer;
export const {
    setAllSkillsAction,
    setAllSkillsLoadingAction,
    setOneSkillAction,
    setOneSkillLoadingAction,
} = skillSlice.actions;