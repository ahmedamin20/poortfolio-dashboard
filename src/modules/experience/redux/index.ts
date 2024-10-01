import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultNonPaginatedState } from "../../../utility/helpers/reduxHelper";
import ExperienceState from "../interfaces/experienceState.ts";
import ExperienceObject from "../interfaces/experienceObject.ts";
import ExperienceTableObject from "../interfaces/experienceTableObject.ts";

const initialState: ExperienceState = defaultNonPaginatedState()
export const experienceSlice = createSlice({
    name: 'experiences',
    initialState,
    reducers: {
        setAllExperiencesAction: (state, action: PayloadAction<ExperienceTableObject[]>) => {
            state.all.data = action.payload;
            console.log(action.payload, 'payloload')
        },
        setAllExperiencesLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.all.loading = action.payload;
        },
        setOneExperienceAction: (state, action: PayloadAction<ExperienceObject>) => {
            state.show.data = action.payload;
        },
        setOneExperienceLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.show.loading = action.payload;
        }
    }
})

export default experienceSlice.reducer;
export const {
    setAllExperiencesAction,
    setAllExperiencesLoadingAction,
    setOneExperienceAction,
    setOneExperienceLoadingAction,
} = experienceSlice.actions;