import { useParams } from 'react-router-dom';
import { lazy, useEffect, useRef } from 'react';
import {
  buildFormikParams,
  formikInstance,
  generateFormikForm,
} from '../../../utility/formik/formikHelper';
import useProjectLogic from '../hooks/useProjectLogic';
import { StoreProject, UpdateProject } from '../types/projectForm';
import projectSchema from '../validation/index';

const ProjectForm = lazy(() => import('../views/projectForm'));
export const emptyProject: StoreProject = {
  _id: '',
  name: '',
  description: '',
  source_code_link: '',
  image: '',
  tags: [],
};

const ProjectFormContainer = () => {
  const {
    getOneProjectLogic,
    oneProject,
    oneLoading,
    updateProjectLogic,
    storeProjectLogic,
  } = useProjectLogic();
  const { _id: id } = useParams();
  const inUpdate = id !== undefined;
  const formRef = useRef();
  const formik = formikInstance({
    initialValues: !inUpdate
      ? emptyProject
      : {
          id: oneProject._id,
          name: oneProject.name,
          description: oneProject.description,
          source_code_link: oneProject.source_code_link,
          image: oneProject.image,
          tags: oneProject.tags,
        },
    validationSchema: projectSchema,
    onSubmit: (values: StoreProject | UpdateProject) => {
      const formData = new FormData(formRef.current);
      const handleArray = () => {
        values?.tags.forEach((item, index) => {
          formData.append(`tags[${index}][name]`, item.name);
          formData.append(`tags[${index}][color]`, item.color);
        });
      };
      if (inUpdate) {
        console.log(values?.tags);
        handleArray();
        updateProjectLogic(formData, id, buildFormikParams(formik));
      } else {
        handleArray();
        storeProjectLogic(formData, buildFormikParams(formik));
      }
    },
  });

  useEffect(() => {
    if (inUpdate) {
      getOneProjectLogic(id);
    }
  }, []);

  return (
    <ProjectForm
      inUpdate={inUpdate}
      formRef={formRef}
      formikObject={generateFormikForm(formik)}
      loading={oneLoading}
    />
  );
};

export default ProjectFormContainer;
