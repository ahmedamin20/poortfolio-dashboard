import {getUniqueParams, updateParams} from "./routeHelper";

export const pushSearchParam = (value: string) => {
    const params = getUniqueParams()
    params.set('handle', value)
    updateParams(params.toString())
}

export const getSearchParam = () => {
    const params = getUniqueParams();

    return params.get('handle') || '';
}