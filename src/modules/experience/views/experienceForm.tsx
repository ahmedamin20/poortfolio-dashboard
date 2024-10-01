import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import CustomFIleInput from '../../../components/CustomFIleInput';
import CustomInput from '../../../components/CustomInput';
import CustomSubmitButton from '../../../components/CustomSubmitButton';
import CustomTextArea from '../../../components/CustomTextArea';
import CustomTable from '../../../components/Table/CustomTable';
import { toastLoader } from '../../../utility/helpers/toastHelper';
import useExperincesForm from '../hooks/useExperienceForm';
import getTagsColumns from './getExperiencesColumns';

const ExperienceForm = ({ inUpdate, formikObject, loading, formRef }) => {
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
  const { handleIncrementProjectsCount, handleDelete, handleProjectsChange } =
    useExperincesForm(inUpdate, formikObject);
  return (
    !loading && (
      <>
        <Breadcrumb
          pageName={inUpdate ? `Edit Experience` : `Add Experience`}
        />

        <div className="grid grid-cols-1 gap-9">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <form ref={formRef} onSubmit={handleSubmit} action="#">
                <div className="p-6.5">
                  <CustomInput
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    label="Title"
                    required
                    name="title"
                    invalid={errors.title && true}
                    error={errors.title}
                    placeholder="Enter Project title"
                  />
                  <CustomInput
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.companyName}
                    label="Company Name"
                    required
                    name="companyName"
                    error={errors.companyName}
                    invalid={errors.companyName && true}
                    placeholder="Enter Company Name"
                  />
                  <CustomInput
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.logoBg}
                    label="Source Logo Background"
                    required
                    name="logoBg"
                    type="color"
                    invalid={errors.logoBg && true}
                    error={errors.logoBg}
                    placeholder="Enter Logo Background"
                  />
                  <CustomInput
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date}
                    label="Date"
                    required
                    name="date"
                    type="date"
                    invalid={errors.date && true}
                    error={errors.date}
                    placeholder="Enter Date"
                  />
                  <CustomFIleInput
                    onChange={(e) => setFieldValue('logo', e.target.files[0])}
                    name={'logo'}
                    label="Company Logo"
                    value={values.logo}
                  />

                  {/* Generate tag input containers based on the length of formik's values.tags */}
                  {values?.projects?.map((project, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <CustomInput
                        name={`projects[${index}].projectName`}
                        label={`proejcts Name ${index + 1}`}
                        placeholder="Enter Project Name"
                        error={errors?.projects?.[index]?.projectName}
                        onBlur={handleBlur}
                        required
                        invalid={!!errors?.projects?.[index]?.projectName}
                        type="text"
                        onChange={(e) =>
                          handleProjectsChange(
                            index,
                            'projectName',
                            e.target.value
                          )
                        }
                        value={project.projectName}
                      />
                      <CustomInput
                        error={errors?.projects?.[index]?.projectUrl}
                        onBlur={handleBlur}
                        invalid={!!errors?.projects?.[index]?.projectUrl}
                        required
                        name={`projects[${index}].projectUrl`}
                        label={`Project URL ${index + 1}`}
                        placeholder="Enter Project URL"
                        type="text"
                        onChange={(e) =>
                          handleProjectsChange(
                            index,
                            'projectUrl',
                            e.target.value
                          )
                        }
                        value={project.projectUrl}
                      />
                    </div>
                  ))}

                  <CustomTable
                    columns={getTagsColumns({ handleDelete })}
                    data={values.projects}
                    title="Projects"
                    buttons={[
                      <button
                        type="button"
                        onClick={handleIncrementProjectsCount}
                        key={0}
                        className="bg-red-500 p-2 text-white"
                      >
                        Add Project +
                      </button>,
                    ]}
                  />

                  <CustomSubmitButton disabled={isSubmitting} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ExperienceForm;
