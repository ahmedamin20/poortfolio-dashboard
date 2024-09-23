export const handleRoute = (path, bindings) => {
    Object.keys(bindings).forEach((key) => {
        path = path.replace(`{${key}}`, bindings[key])
    })

    return path;
}

export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
};