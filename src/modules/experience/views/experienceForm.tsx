import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import CustomFIleInput from '../../../components/CustomFIleInput';
import CustomInput from '../../../components/CustomInput';
import CustomSubmitButton from '../../../components/CustomSubmitButton';
import CustomTextArea from '../../../components/CustomTextArea';
import CustomTable from '../../../components/Table/CustomTable';
import { toastLoader } from '../../../utility/helpers/toastHelper';
import useProjectForm from '../hooks/useExperienceForm';
import getTagsColumns from './tagsColumns';

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
  const { handleIncrementTagsCount, handleDelete, handleTagChange } =
    useProjectForm(inUpdate, formikObject);
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
                    value={values.name}
                    label="Name"
                    required
                    name="name"
                    invalid={errors.name && true}
                    error={errors.name}
                    placeholder="Enter Project Name"
                  />
                  <CustomTextArea
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    label="Description"
                    required
                    name="description"
                    error={errors.description}
                    placeholder="Enter Description"
                  />
                  <CustomInput
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.source_code_link}
                    label="Source Code Link"
                    required
                    name="source_code_link"
                    invalid={errors.source_code_link && true}
                    error={errors.source_code_link}
                    placeholder="Enter Source Code Link"
                  />
                  <CustomFIleInput
                    onChange={(e) => setFieldValue('image', e.target.files[0])}
                    name={'image'}
                    label="Image"
                    value={values.image}
                  />

                  {/* Generate tag input containers based on the length of formik's values.tags */}
                  {values?.tags?.map((tag, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <CustomInput
                        name={`tags[${index}].name`}
                        label={`Tag Name ${index + 1}`}
                        placeholder="Enter Tag Name"
                        error={errors?.tags?.[index]?.name}
                        onBlur={handleBlur}
                        required
                        invalid={!!errors?.tags?.[index]?.name}
                        type="text"
                        onChange={(e) =>
                          handleTagChange(index, 'name', e.target.value)
                        }
                        value={tag.name}
                      />
                      <CustomInput
                        error={errors?.tags?.[index]?.color}
                        onBlur={handleBlur}
                        invalid={!!errors?.tags?.[index]?.color}
                        required
                        name={`tags[${index}].color`}
                        label={`Tag Color ${index + 1}`}
                        placeholder="Enter Tag Color"
                        type="color"
                        onChange={(e) =>
                          handleTagChange(index, 'color', e.target.value)
                        }
                        value={tag.color}
                      />
                    </div>
                  ))}

                  <CustomTable
                    columns={getTagsColumns({ handleDelete })}
                    data={values.tags}
                    title="Tags"
                    buttons={[
                      <button
                        type="button"
                        onClick={handleIncrementTagsCount}
                        key={0}
                        className="bg-red-500 p-2 text-white"
                      >
                        Add Tag
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
