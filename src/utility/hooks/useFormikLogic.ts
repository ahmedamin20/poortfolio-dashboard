import {useEffect, useState} from "react";
import {isObjEmpty} from "../Utils";

const useFormikLogic = (isSubmitting: boolean, errors: object) => {
    const [submit, setShouldSubmit] = useState(true);

    useEffect(() => {
        setShouldSubmit(!isSubmitting && isObjEmpty(errors))
    }, [errors, isSubmitting])

    const shouldSubmit = () => {
        return submit;
    }

    return {shouldSubmit}
}

export default useFormikLogic;