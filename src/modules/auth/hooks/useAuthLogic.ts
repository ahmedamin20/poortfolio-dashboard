import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import {HttpResponse} from "../../../constants/api";
import {resetLogin, setToken, setUserData} from "../utils/authHelper";
import {LOGIN_ROUTE} from "../constants/routes";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../../redux/store.ts";
import {
    resetLoginReducer,
    setUserInfoCodeReducer,
    setUserInfoLoadingReducer,
    setUserInfoReducer
} from "../redux/loginReducer";
import { DEFAULT_ROUTE } from "../../../constants/routes.ts";

export const useAuthLogic = () => {
    const dispatch = useDispatch()
    const loginSelector = useSelector((state: RootState) => state.loginReducer)
    const navigate = useNavigate()

    const userInfoHandler = (result, shouldSetToken = true) => {
        if (result.status === HttpResponse.OK) {

            if (shouldSetToken) {
                setToken(result.data.token)
                navigate(DEFAULT_ROUTE, {replace: true})
            }

            //TODO redux stuff
            dispatch(setUserInfoReducer(result.data.data))
        }

        dispatch(setUserInfoCodeReducer(result.data.code))
    }

    const dispatchLogin = (payload) => {
        dispatch(setUserInfoLoadingReducer(true))

        return axiosInstance.post("/api/auth/login", payload)
                    .then((result) => userInfoHandler(result))
                    .finally(() => {
                        dispatch(setUserInfoLoadingReducer(false))
                    }).then(()=>navigate(DEFAULT_ROUTE))
            
    }

    const fetchProfile = () => {
        return axiosInstance
            .get('/auth/profile')
            .then(res => userInfoHandler(res, false))
    }

    const dispatchLogout = () => {
        axiosInstance
            .post('/api/auth/logout')
            .then(() => {
                resetLogin()
                dispatch(resetLoginReducer())
                navigate(LOGIN_ROUTE)
            })
    }
    return {
        loginSelector,
        dispatchLogin,
        fetchProfileLogic: fetchProfile,
        dispatchLogout
    }
}