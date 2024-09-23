import * as Yup from 'yup'
import customSchema from "../validation/customSchema";
import {Schema} from "yup";

export const replaceDefaultRules = (defaultRules: object, newRules: object) => {
    if (newRules) {
        Object.keys(newRules).forEach((key) => {
            if (!newRules[key]) {
                delete defaultRules[key]
            } else {
                defaultRules[key] = newRules[key]
            }
        })
    }

    return Object.values(defaultRules)?.filter((item) => !!item);
}

export const emailRules = (newRules = {}) => {
    const defaultRules = {
        string: 'string',
        required: 'required',
        email: 'email',
        trim: 'trim'
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const stringRules = (newRules = {}) => {
    const defaultRules = {
        string: 'string',
        required: 'required',
        max: 'max:255',
        trim: 'trim'
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const longTextRules = (newRules = {}) => {
    return stringRules({...{max: null}, ...newRules})
}

export const latitudeRules = (newRules = {}) => {
    const defaultRules = {
        number: 'number',
        required: 'required',
        latitude: 'latitude'
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const longitudeRules = (newRules = {}) => {
    return latitudeRules({latitude: 'longitude', ...newRules})
}

export const imageRules = (newRules = {}) => {
    const defaultRules = {
        required: 'required',
        image: 'image'
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const passwordRules = (newRules = {}) => {
    const defaultRules = {
        string: 'string',
        required: 'required',
        min: 'min:8',
        trim: 'trim'
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const integerRules = (newRules = {}) => {
    const defaultRules = {
        number: 'number',
        required: 'required',
        min: 'min:1'
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const booleanRules = (newRules = {}) => {
    const defaultRules = {
        boolean: 'boolean',
        required: 'required'
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const doubleRules = (newRules = {}) => {
    return integerRules(newRules)
}

export const foreignKeyRules = (newRules = {}) => {
    const defaultRules = {
        mixed: 'mixed',
        required: 'required'
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const percentageRules = (newRules = {}) => {
    return integerRules({max: 'max:100', ...newRules})
}

export const arrayRules = (newRules = {}) => {
    const defaultRules = {
        array: 'array',
        required: 'required',
        min: 'min:1'
    }

    if (
        (newRules['required'] === null
            || newRules['required'] === undefined
            || newRules['required'] === 'notRequired')
    ) {
        delete defaultRules.min
    }

    return replaceDefaultRules(defaultRules, newRules)
}

export const enumRules = (availableRules: object, newRules = {}) => {
    const defaultRules = {
        mixed: 'mixed',
        required: 'required',
        enum: `enum:${JSON.stringify(availableRules)}`
    }

    return replaceDefaultRules(defaultRules, newRules)
}

const isCustomRule = (ruleName: string) => {
    return customSchema[ruleName] !== undefined;
}

const mergeSchema = (fieldSchema, ruleName, params) => {
    return fieldSchema.test(
        ruleName,
        'error',
        (value, {createError}) => customSchema[ruleName](value, createError, ...params));
}

/**
 * @return Yup
 * */
export const generateFieldSchema = (fieldRules): Schema => {
    let fieldSchema = Yup

    fieldRules.forEach((rule: string) => {
        const [ruleName, ...params] = rule.split(':');

        if (isCustomRule(ruleName)) {
            fieldSchema = mergeSchema(fieldSchema, ruleName, params)
        } else {
            fieldSchema = fieldSchema[ruleName](...params);
        }
    });

    return fieldSchema;
}

const generateSchema = (allRulesObject: object) => {
    let schema = Yup.object().shape({});

    Object.entries(allRulesObject).forEach(([fieldName, fieldRules]) => {
        if (fieldRules) {
            schema = schema.shape({[fieldName]: generateFieldSchema(fieldRules)});
        }
    });

    return schema;
};

export const yupInstance = Yup;

export default generateSchema