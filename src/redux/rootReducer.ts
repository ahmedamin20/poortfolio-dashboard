
import { combineReducers } from "@reduxjs/toolkit";
import  loginReducer  from "../modules/auth/redux/loginReducer";
import  skillsReducer  from "../modules/skills/redux/index";
import projectsReducer from "../modules/projects/redux"

export default combineReducers({
    loginReducer,
    skillsReducer,
    projectsReducer
})