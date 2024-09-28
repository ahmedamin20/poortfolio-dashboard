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
  console.log(values);
  const [tagsCount, setTagsCount] = useState<number>(1);
  toastLoader(loading);
  const [tags, setTags] = useState<tag[]>([
    {
      _id: '',
      name: '',
      color: '',
    },
  ]);
  useEffect(() => {
    if (inUpdate) {
      setTags(values?.tags || []); // Ensure tags is always an array
      setTagsCount(values?.tags?.length || 1); // Ensure tagsCount is at least 1
    }
  }, [inUpdate]); // Add `inUpdate` as a dependency

  const handleIncrementTagsCount = () => {
    setTagsCount(tagsCount + 1);
  };

  const handlePushTags = (values: tag) => {
    setTags([...tags, values]);
  };
  console.log(isSubmitting, 'is Submitting');
  const buttons = [<button onClick={()=>handlePushTags} key={0}>add</button>]
 
  const handleDelete = (id: string) => {
    const newTags = tags.filter((tag) => tag._id !== id);
    setTags(newTags);
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

                  {/* Generate tag input containers based on tagsCount */}
                  {/* Generate tag input containers based on tagsCount */}
                  {Array.from({ length: tagsCount }).map((_, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <CustomInput
                        name={`tags[${index}].name`}
                        label={`Tag Name ${index + 1}`}
                        placeholder="Enter Tag Name"
                        error={errors?.tags?.[index]?.name} // Check if errors.tags and errors.tags[index] exist
                        onBlur={handleBlur}
                        required
                        invalid={!!errors?.tags?.[index]?.name}
                        type="text"
                        onChange={handleChange}
                        value={values?.tags?.[index]?.name || ''} // Safely access values.tags[index]
                      />
                      <CustomInput
                        error={errors?.tags?.[index]?.color} // Check if errors.tags and errors.tags[index] exist
                        onBlur={handleBlur}
                        invalid={!!errors?.tags?.[index]?.color}
                        required
                        name={`tags[${index}].color`}
                        label={`Tag Color ${index + 1}`}
                        placeholder="Enter Tag Color"
                        type="color"
                        onChange={handleChange}
                        value={values?.tags?.[index]?.color || ''} // Safely access values.tags[index]
                      />
                    </div>
                  ))}
                    <CustomTable
                      columns={getTagsColumns(handleDelete)}
                      data={tags}
                      title='Tags'
                      buttons={buttons}
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
