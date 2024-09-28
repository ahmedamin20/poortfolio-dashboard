import { lazy } from "react";
import projectRoutes from "../constants/routes";

const ProjectContainer = lazy(() => import('../containers/ProjectContainer'));
const ProjectFormContainer = lazy(() => import('../containers/ProjectFormContainer'))
const project = [
    {
        path: projectRoutes.TABLE,
        element: <ProjectContainer/>
    },
    {
        path: projectRoutes.EDIT,
        element: <ProjectFormContainer />
    },
    {
        path: projectRoutes.ADD,
        element: <ProjectFormContainer />
    }
];

export default project