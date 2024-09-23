export function appendToFormData(formData: FormData, data, parentKey = '') {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.entries(data).forEach(([key, value]) => {
            const fullKey = parentKey ? `${parentKey}[${key}]` : key;
            if (Array.isArray(value)) {
                value.forEach((arrayItem, index) => {
                    appendToFormData(formData, arrayItem, `${fullKey}[${index}]`);
                });
            } else {
                appendToFormData(formData, value, fullKey);
            }
        });
    } else {
        formData.append(parentKey, data);
    }
    return formData;
}