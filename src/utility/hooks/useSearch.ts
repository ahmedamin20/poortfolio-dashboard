import {pushSearchParam} from "../helpers/searchHelper";

// eslint-disable-next-line @typescript-eslint/ban-types
const useSearch = (getAllDataLogic: Function) => {
    const handleSearch = (value: string) => {
        pushSearchParam(value)
        getAllDataLogic()
    }

    return {handleSearch}
}

export default useSearch;