import { useEffect } from 'react';

const useProjectForm = (inUpdate, formikObject) => {
  const { values, setFieldValue } = formikObject;

  // Ensure tags is always an array in formik's values when in update mode
  useEffect(() => {
    if (inUpdate) {
      setFieldValue('tags', values?.tags || []);
    }
  }, [inUpdate, setFieldValue, values?.tags]);

  // Handler to add a new tag input field
  const handleIncrementTagsCount = () => {
    setFieldValue('tags', [
      ...values.tags,
      { _id: '', name: '', color: '' }, // Add a default empty tag
    ]);
  };

  // Handler to delete a tag based on its id
  const handleDelete = (id) => {
    const newTags = values.tags.filter((tag) => tag._id !== id);
    setFieldValue('tags', newTags);
  };

  // Handler to update a specific tag's name or color
  const handleTagChange = (index, key, value) => {
    const updatedTags = [...values.tags];
    updatedTags[index][key] = value;
    setFieldValue('tags', updatedTags);
  };

  return {
    handleIncrementTagsCount,
    handleDelete,
    handleTagChange,
  };
};

export default useProjectForm;
