
import { combineReducers } from "@reduxjs/toolkit";
import  resetLoginReducer  from "../modules/auth/redux/loginReducer";


export default combineReducers({
    loginReducer: resetLoginReducer
})