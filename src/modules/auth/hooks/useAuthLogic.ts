import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import {HttpResponse} from "../../../constants/api";
import {resetLogin, setUserData} from "../utils/authHelper";
import {LOGIN_ROUTE} from "../constants/routes";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../../redux/store.ts";
import {
    resetLoginReducer,
    setUserInfoCodeReducer,
    setUserInfoLoadingReducer,
    setUserInfoReducer
} from "../redux/loginReducer";

export const useAuthLogic = () => {
    const dispatch = useDispatch()
    const loginSelector = useSelector((state: RootState) => state.loginReducer)
    const navigate = useNavigate()

    const userInfoHandler = (result, shouldSetToken = true) => {
        if (result.data.code === HttpResponse.OK) {
            setUserData(result.data.data)

            if (shouldSetToken) {
                // setToken(result.data.data.token)
            }

            //TODO redux stuff
            dispatch(setUserInfoReducer(result.data.data))
        }

        dispatch(setUserInfoCodeReducer(result.data.code))
    }

    const dispatchLogin = async (payload) => {
        console.log("logging")
        dispatch(setUserInfoLoadingReducer(true))

        return await axiosInstance.post("/api/auth/login", payload)
                    .then((result) => console.log(result, "hereee"))
                    .finally(() => {
                        dispatch(setUserInfoLoadingReducer(false))
                    })
            
    }

    const fetchProfile = () => {
        return axiosInstance
            .get('/auth/profile')
            .then(res => userInfoHandler(res, false))
    }

    const dispatchLogout = () => {
        axiosInstance
            .post('/auth/logout')
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