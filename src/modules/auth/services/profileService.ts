import {getUserData} from "../utils/authHelper";
import {useAuthLogic} from "../hooks/useAuthLogic";

const profileService = () => {
    const {fetchProfileLogic} = useAuthLogic()

    const fetchProfileInfo = async () => {
        const userData = getUserData()

        if (Object.keys(userData).length === 0) {
            await fetchProfileLogic()
        }
    }

    const updateProfile = () => {

    }

    return {fetchProfileInfo, updateProfile}
}

export default profileService