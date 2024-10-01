import { toastLoader } from '../../../utility/helpers/toastHelper';

const ExperienceForm = ({ inUpdate, formikObject, loading }) => {
  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
  } = formikObject;

  toastLoader(loading);

  return <div></div>;
};

export default ExperienceForm;
