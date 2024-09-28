import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultNonPaginatedState } from "../../../utility/helpers/reduxHelper";
import ProjectState from "../interfaces/projectState.ts";
import ProjectObject from "../interfaces/projectObject.ts";
import ProjectTableObject from "../interfaces/projectTableObject.ts";

const initialState: ProjectState = defaultNonPaginatedState()
export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setAllProjectsAction: (state, action: PayloadAction<ProjectTableObject[]>) => {
            state.all.data = action.payload;
        },
        setAllProjectsLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.all.loading = action.payload;
        },
        setOneProjectAction: (state, action:  PayloadAction<ProjectObject>) => {
            state.show.data = action.payload;
        },
        setOneProjectLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.show.loading = action.payload;
        }
    }
})

export default projectSlice.reducer;
export const {
    setAllProjectsAction,
    setAllProjectsLoadingAction,
    setOneProjectAction,
    setOneProjectLoadingAction,
} = projectSlice.actions;