import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import CustomFIleInput from '../../../components/CustomFIleInput';
import CustomInput from '../../../components/CustomInput';
import CustomSubmitButton from '../../../components/CustomSubmitButton';
import CustomTextArea from '../../../components/CustomTextArea';
import { toastLoader } from '../../../utility/helpers/toastHelper';
import CustomTable from '../../../components/Table/CustomTable';
import getTagsColumns from './tagsColumns';

interface tag {
  _id: string;
  name: string;
  color: string;
}

const ProjectForm = ({ inUpdate, formikObject, loading, formRef }) => {
  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    setFieldValue,
    handleChange,
    isSubmitting,
  } = formikObject;

  toastLoader(loading);

  useEffect(() => {
    if (inUpdate) {
      // Ensure tags is always an array in formik's values
      setFieldValue('tags', values?.tags || []);
    }
  }, [inUpdate]);

  const handleIncrementTagsCount = () => {
    setFieldValue('tags', [
      ...values.tags,
      { _id: '', name: '', color: '' }, // Add a default empty tag
    ]);
  };

  const handleDelete = (id: string) => {
    const newTags = values.tags.filter((tag) => tag._id !== id);
    setFieldValue('tags', newTags);
  };

  return (
    !loading && (
      <>
        <Breadcrumb pageName={inUpdate ? `Edit Project` : `Add Project`} />

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
                  {values.tags.map((tag, index) => (
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
                        onChange={(e) => {
                          const updatedTags = [...values.tags];
                          updatedTags[index].name = e.target.value;
                          setFieldValue('tags', updatedTags);
                        }}
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
                        onChange={(e) => {
                          const updatedTags = [...values.tags];
                          updatedTags[index].color = e.target.value;
                          setFieldValue('tags', updatedTags);
                        }}
                        value={tag.color}
                      />
                    </div>
                  ))}

                  <CustomTable
                    columns={getTagsColumns(handleDelete)}
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

                  {/* Button to add more tags */}
                  <button
                    type="button"
                    onClick={handleIncrementTagsCount}
                    className="text-blue-500 hover:underline"
                  >
                    Add Another Tag
                  </button>

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

export default ProjectForm;
