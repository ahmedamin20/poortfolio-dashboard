import PropTypes from "prop-types";

const FormikConfig = ({initialValues, validationSchema, onSubmit, overrideConfig}) => {
    return {
        initialValues,
        validateOnBlur: true,
        validateOnChange: false,
        validateOnMount: false,
        enableReinitialize: true,
        validationSchema,
        onSubmit,
        ...overrideConfig
    }
}

FormikConfig.propTypes = {
    initialValues: PropTypes.object,
    validationSchema: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default FormikConfig