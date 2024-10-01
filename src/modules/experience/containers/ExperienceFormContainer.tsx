import { useParams } from 'react-router-dom';
import { lazy, useEffect, useRef } from 'react';
import {
  buildFormikParams,
  formikInstance,
  generateFormikForm,
} from '../../../utility/formik/formikHelper';
import useExperienceLogic from '../hooks/useExperienceLogic';
import { StoreExperience, UpdateExperience } from '../types/experienceForm';
import experienceSchema from '../validation/index';

const ExperienceForm = lazy(() => import('../views/experienceForm'));
export const emptyExperience: StoreExperience = {
  _id: 0,
  title: '',
  companyName: '',
  date: '',
  logo: '',
  logoBg: '',
  points: [],
  projects: [],
};

const ExperienceFormContainer = () => {
  const {
    getOneExperienceLogic,
    oneExperience,
    oneLoading,
    updateExperienceLogic,
    storeExperienceLogic,
  } = useExperienceLogic();
  const { id: id } = useParams();
  const inUpdate = id !== undefined;
  const formRef = useRef();
  const formik = formikInstance({
    initialValues: !inUpdate
      ? emptyExperience
      : {
          id: oneExperience._id,
          title: oneExperience.title,
          companyName: oneExperience.companyName,
          date: oneExperience.date,
          logo: oneExperience.logo,
          logoBg: oneExperience.logoBg,
          projects: oneExperience.projects,
          points: oneExperience.points,
        },
    validationSchema: experienceSchema,
    onSubmit: (values: StoreExperience | UpdateExperience) => {
      if (inUpdate) {
        updateExperienceLogic(values, id, buildFormikParams(formik));
      } else {
        storeExperienceLogic(values, buildFormikParams(formik));
      }
    },
  });

  useEffect(() => {
    if (inUpdate) {
      getOneExperienceLogic(id);
    }
  }, []);

  return (
    <ExperienceForm
      formRef={formRef}
      inUpdate={inUpdate}
      formikObject={generateFormikForm(formik)}
      loading={oneLoading}
    />
  );
};

export default ExperienceFormContainer;
