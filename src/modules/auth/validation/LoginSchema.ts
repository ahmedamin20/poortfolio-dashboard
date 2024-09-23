import generateSchema, { passwordRules, stringRules } from "../../../utility/helpers/validationRuleHelper"

const LoginSchema = () => {
    return generateSchema({
        username: stringRules({ required: null }),
        password: passwordRules({ min: null })
    })
}

export default LoginSchema