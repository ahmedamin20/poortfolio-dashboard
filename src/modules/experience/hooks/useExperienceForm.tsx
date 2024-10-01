import { useEffect } from 'react';

const useExperincesForm = (inUpdate, formikObject) => {
  const { values, setFieldValue } = formikObject;

  useEffect(() => {
    if (inUpdate) {
      setFieldValue('projects', values?.projects || []);
    }
  }, [inUpdate, setFieldValue, values?.projects]);

  const handleIncrementProjectsCount = () => {
    setFieldValue('projects', [
      ...values.projects,
      { _id: '', projectName: '', projectUrl: '' },
    ]);
  };

  const handleDelete = (id) => {
    const newProjects = values.prjects.filter((project) => project._id !== id);
    setFieldValue('projects', newProjects);
  };

  const handleProjectsChange = (index, key, value) => {
    const updatesProjects = [...values.projects];
    updatesProjects[index][key] = value;
    setFieldValue('projects', updatesProjects);
  };

  return {
    handleIncrementProjectsCount,
    handleDelete,
    handleProjectsChange,
  };
};

export default useExperincesForm;
