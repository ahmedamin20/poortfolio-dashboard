export const parseRoute = (url = '', bindings: {
    [key: string]: string|undefined|number
} = {}) => {
    let routePath = url;
    for (const [key, value] of Object.entries(bindings)) {
            routePath = routePath.replace(`:${key}`, value as string);
    }

    return routePath;
}

export function getUniqueParams() {
    const urlParams = new URLSearchParams(window.location.search);

    const uniqueParams = new Set();

    urlParams.forEach((_value, key) => {
        uniqueParams.add(key);
    });

    const uniqueParamsArray = Array.from(uniqueParams);

    const uniqueUrlParams = new URLSearchParams();

    uniqueParamsArray.forEach((item: unknown) => {
        if (typeof item === "string") {
            const value = urlParams.get(item) as string
            uniqueUrlParams.append(item, value);
        }
    });

    return uniqueUrlParams;
}

export const updateParams = (params: string) => {
    const newUrl = `${window.location.pathname}?${params}`;
    window.history.pushState({path: newUrl}, '', newUrl);
}

export const pushParams = (paramsObject) => {
    const paramsKeys = Object.keys(paramsObject);
    const params = paramsKeys.length !== 0 ? getUniqueParams() : new URLSearchParams();

    paramsKeys.forEach((key) => {
        params.set(key, paramsObject[key]);
    });

    updateParams(params.toString());
}

export const goBack = () => {
    history.back()
}

export const getValidParams = (params = undefined) => {
    return params === undefined ? getUniqueParams() : params;
}