import generateSchema, { stringRules } from "../../../utility/helpers/validationRuleHelper";

const projectSchema = generateSchema({
    name: stringRules(),
    description: stringRules(),
    source_code_link: stringRules(),
    
});

export default projectSchema