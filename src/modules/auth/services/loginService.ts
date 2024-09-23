import {useAuthLogic} from "../hooks/useAuthLogic";

const LoginService = () => {
    const {dispatchLogin, loginSelector} = useAuthLogic()
    const {userInfo, isLoading, code} = loginSelector;

    const handleLogin = async (payload) => {
        await dispatchLogin(payload)
    }

    return {
        handleLogin,
        userInfo,
        isLoading,
        code
    }
}

export default LoginService
