const isFile = (value) => {
    return (value instanceof File)
}

const fileSchema = (value: File, createError) => {
    if (!isFile(value)) {
        return createError('field must be a valid file')
    }

    return true;
}

const imageSchema = (value: File, createError) => {
    const type = value?.type?.split('/')[0] || null;

    if (!isFile(value) || type !== 'image') {
        return createError({message: 'field must be an image'})
    }

    return true;
}

const enumSchema = (value, createError, allowedRules) => {
    allowedRules = JSON.parse(allowedRules);

    if (!Array.isArray(allowedRules)) {
        return createError('field is invalid');
    }

    return allowedRules.includes(value.value);
}

const latitudeSchema = (value, createError) => {
    if (value < -90 || value > 90) {
        return createError('field must be greater than or equal -90 and less than or equal 90')
    }

    return true;
}

const longitudeSchema = (value: number, createError) => {
    if (value < -180 || value > 180) {
        return createError('field must be greater than or equal -180 and less than or equal 180')
    }

    return true;
}

const customSchema = {
    file: fileSchema,
    image: imageSchema,
    enum: enumSchema,
    latitude: latitudeSchema,
    longitude: longitudeSchema
}

export default customSchema