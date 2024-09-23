import {FormikErrors} from "formik/dist/types";
import * as React from "react";

export type FormikSetErrors<Values> = (errors: FormikErrors<Values>) => void;
export type FormikInitialValues<Values> = Values;
export type initialStatus = any;
export type FormikHandleBlur= {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
}
export type FormikHandleChange = {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
}

export type BuiltFormikParams<Values> = {
    setErrors: FormikSetErrors<Values>;
    initialValues: FormikInitialValues<Values>;
    setSubmitting: (isSubmitting: boolean) => void;
}