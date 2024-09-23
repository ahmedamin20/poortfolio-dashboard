import { FormikProps, useFormik } from "formik";
import FormikConfig from "./formikConfig";
import { HttpResponse } from "../../constants/api";
import toastFactory from "../factories/toastFactory";
import { isObjEmpty } from "../Utils";
import {BuiltFormikParams} from "../../types/formik.ts";

// Define the shape of the props passed to FormikConfig
interface FormikInstanceProps {
    [key: string]: any;
}

// Define the shape of the response object
interface Response {
    code: number;
    data: { [key: string]: any };
}

// Formik instance
export const formikInstance = (props: FormikInstanceProps): FormikProps<any> => {
    const formikConfig = FormikConfig(props);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFormik(formikConfig);
}

// Set nested value in an object
function setNestedValue(obj: any, keys: string[], value: any): void {
    const key = keys.shift();

    if (!key) return;

    if (keys.length === 0) {
        obj[key] = value;
        return;
    }

    if (!obj[key]) {
        obj[key] = isNaN(Number(keys[0])) ? {} : [];
    }

    setNestedValue(obj[key], keys, value);
}

// Generate a nested object from a flat object
function generateNestedObject(flatObject: { [key: string]: any }): { [key: string]: any } {
    const nestedObject: { [key: string]: any } = {};

    Object.keys(flatObject).forEach(key => {
        const keys = key.split('.');
        setNestedValue(nestedObject, keys, flatObject[key]);
    });

    return nestedObject;
}

// Handle formik errors based on the response
export const formikErrorHandler = (response: Response, formikObject: BuiltFormikParams<any>): void => {
    if (response.code !== HttpResponse.VALIDATION_ERRORS) {
        return;
    }

    const { initialValues, setErrors } = formikObject;
    const errorKeys = Object.keys(initialValues);
    const tmpErrors = generateNestedObject(response.data);

    if (!isObjEmpty(tmpErrors)) {
        setErrors(tmpErrors);
    }

    const responseErrorKeys = Object.keys(response.data);
    for (let i = 0; i < responseErrorKeys.length; i++) {
        if (!errorKeys.includes(responseErrorKeys[i])) {
            toastFactory.error(response.data[responseErrorKeys[i]]);
            break;
        }
    }
}

export const buildFormikParams = (formik: FormikProps<any>): BuiltFormikParams<any> => {
    return {
        setErrors: formik.setErrors,
        initialValues: formik.initialValues,
        setSubmitting: formik.setSubmitting
    };
}

export const generateFormikForm = (formik: FormikProps<any>) => {
    return {
        handleChange: formik.handleChange,
        handleSubmit: formik.handleSubmit,
        handleBlur: formik.handleBlur,
        values: formik.values,
        errors: formik.errors,
        isValid: formik.isValid,
        isSubmitting: formik.isSubmitting,
        setFieldValue: formik.setFieldValue,
        resetForm: formik.resetForm,
        setErrors: formik.setErrors,
        setValues: formik.setValues,
    };
}
