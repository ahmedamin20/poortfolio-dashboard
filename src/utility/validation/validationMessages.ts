// Define custom error messages
const validationMessages = {
    mixed: {
        default: 'field is invalid.',
        required: 'field is required.',
        oneOf: 'field must be one of the following values: ${values}.',
        notOneOf: 'field must not be one of the following values: ${values}.'
    },
    string: {
        length: 'field must be exactly ${length} characters long.',
        min: 'field must be at least ${min} characters long.',
        max: 'field must be at most ${max} characters long.',
        matches: 'field must match the following: "${regex}".',
        email: 'field must be a valid email address.',
        url: 'field must be a valid URL.',
        trim: 'field must be a trimmed string.',
        lowercase: 'field must be a lowercase string.',
        uppercase: 'field must be an uppercase string.'
    },
    number: {
        min: 'field must be greater than or equal to ${min}.',
        max: 'field must be less than or equal to ${max}.',
        lessThan: 'field must be less than ${less}.',
        moreThan: 'field must be more than ${more}.',
        positive: 'field must be a positive number.',
        negative: 'field must be a negative number.',
        integer: 'field must be an integer.'
    },
    date: {
        min: 'field must be later than ${min}.',
        max: 'field must be earlier than ${max}.'
    },
    boolean: {
        isValue: 'field must be ${value}.'
    },
    object: {
        noUnknown: 'field has unspecified keys: ${unknown}.'
    },
    array: {
        min: 'field must have at least ${min} items.',
        max: 'field must have less than or equal to ${max} items.'
    }
};

export default validationMessages