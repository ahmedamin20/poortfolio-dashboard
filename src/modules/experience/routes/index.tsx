import { lazy } from "react";
import experienceRoutes from "../constants/routes";

const ExperienceContainer = lazy(() => import('../containers/ExperienceContainer'));
const ExperienceFormContainer = lazy(() => import('../containers/ExperienceFormContainer'))
const experience = [
    {
        path: experienceRoutes.TABLE,
        element: <ExperienceContainer/>
    },
    {
        path: experienceRoutes.EDIT,
        element: <ExperienceFormContainer />
    },
    {
        path: experienceRoutes.ADD,
        element: <ExperienceFormContainer />
    }
];

export default experience