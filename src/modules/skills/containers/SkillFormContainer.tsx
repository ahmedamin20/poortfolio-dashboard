import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  buildFormikParams,
  formikInstance,
  generateFormikForm,
} from '../../../utility/formik/formikHelper';
import useSkillLogic from '../hooks/useSkillLogic';
import { StoreSkill, UpdateSkill } from '../types/skillForm';
import skillSchema from '../validation/index';
import SkillForm from '../views/skillForm';

export const emptySkill: StoreSkill = {
  _id: '',
  name: '',
  image: '',
};

const SkillFormContainer = () => {
  const {
    getOneSkillLogic,
    oneSkill,
    oneLoading,
    updateSkillLogic,
    storeSkillLogic,
  } = useSkillLogic();
  const { _id: id } = useParams();
  const formRef = useRef();
  const inUpdate = id !== undefined;
  console.log(oneSkill, 'oneSkill');
  const formik = formikInstance({
    initialValues: !inUpdate
      ? emptySkill
      : {
          _id: oneSkill._id,
          name: oneSkill.name,
          image: oneSkill.image,
        },
    validationSchema: skillSchema,
    onSubmit: (values: StoreSkill | UpdateSkill) => {
      const formData = new FormData(formRef.current);
      if (inUpdate) {
        updateSkillLogic(formData, id, buildFormikParams(formik));
      } else {
        storeSkillLogic(formData, buildFormikParams(formik));
      }
    },
  });

  useEffect(() => {
    if (inUpdate) {
      getOneSkillLogic(id);
    }
  }, []);
  return (
    <SkillForm
      formRef={formRef}
      inUpdate={inUpdate}
      formikObject={generateFormikForm(formik)}
      loading={oneLoading}
    />
  );
};

export default SkillFormContainer;
