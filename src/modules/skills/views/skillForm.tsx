import { toastLoader } from '../../../utility/helpers/toastHelper';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import CustomInput from '../../../components/CustomInput';
import CustomSubmitButton from '../../../components/CustomSubmitButton';
import CustomFIleInput from '../../../components/CustomFIleInput';

const SkillForm = ({ inUpdate, formikObject, loading, formRef }) => {
  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    setFieldValue,
  } = formikObject;
  toastLoader(loading);
  return (
    <>
      <Breadcrumb pageName={inUpdate ? `Edit Skill` : `Add Skill`} />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form ref={formRef} onSubmit={handleSubmit} action="#">
              <div className="p-6.5">
                <CustomInput
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  label="Name"
                  required
                  name="name"
                  invalid={errors.name && true}
                  error={errors.name}
                  placeholder="Enter skill name" // <-- Add this line
                />
                <CustomFIleInput
                  onChange={(e) => setFieldValue('image', e.target.files[0])}
                  name={'image'}
                  label="Image"
                  value={values.image}
                />
                <CustomSubmitButton disabled={isSubmitting} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillForm;
