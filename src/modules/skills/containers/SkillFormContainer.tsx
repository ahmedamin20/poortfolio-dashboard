import {useParams} from "react-router-dom";
import {lazy, useEffect} from "react";
import {buildFormikParams, formikInstance, generateFormikForm} from "../../../utility/formik/formikHelper";
import useSkillLogic from "../hooks/useSkillLogic";
import {StoreSkill, UpdateSkill} from "../types/skillForm";
import skillSchema from "../validation/index";

const SkillForm = lazy(() => import('../views/skillForm'))
export const emptySkill: StoreSkill = {
    id: '',
}

const SkillFormContainer = () => {
    const {getOneSkillLogic, oneSkill, oneLoading, updateSkillLogic, storeSkillLogic} = useSkillLogic();
    const {id: id} = useParams();
    const inUpdate = id !== undefined;

    const formik = formikInstance({
        initialValues: !inUpdate ? emptySkill : {
            id: oneSkill.id,
        },
        validationSchema: skillSchema,
        onSubmit: (values: StoreSkill|UpdateSkill) => {
            if (inUpdate) {
                updateSkillLogic(values, id, buildFormikParams(formik))
            } else {
                storeSkillLogic(values, buildFormikParams(formik))
            }
        }});

    useEffect(() => {
        if (inUpdate) {
            getOneSkillLogic(id)
        }
    }, []);

    return <SkillForm
        inUpdate={inUpdate}
        formikObject={generateFormikForm(formik)}
        loading={oneLoading}
    />
}

export default SkillFormContainer;