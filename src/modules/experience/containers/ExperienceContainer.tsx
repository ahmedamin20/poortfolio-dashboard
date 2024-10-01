import { lazy, useEffect } from 'react';
import useExperienceLogic from '../hooks/useExperienceLogic.ts';

const ExperienceTable = lazy(() => import('../views/experienceTable'));

const ExperienceContainer = () => {
  const {
    all,
    allLoading,
    deleteLoading,
    getAllExperiencesLogic,
    deleteExperienceLogic,
  } = useExperienceLogic();

  useEffect(() => {
    getAllExperiencesLogic();
  }, []);
  return (
    <ExperienceTable
      loading={allLoading || deleteLoading}
      data={all}
      handleDelete={deleteExperienceLogic}
    />
  );
};

export default ExperienceContainer;
