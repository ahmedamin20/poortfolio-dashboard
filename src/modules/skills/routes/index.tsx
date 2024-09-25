import { lazy } from "react";
import skillRoutes from "../constants/routes";

const SkillContainer = lazy(() => import('../containers/SkillContainer'));
const SkillFormContainer = lazy(() => import('../containers/SkillFormContainer'))
const skill = [
    {
        path: skillRoutes.TABLE,
        element: <SkillContainer/>
    },
    {
        path: skillRoutes.EDIT,
        element: <SkillFormContainer />
    },
    {
        path: skillRoutes.ADD,
        element: <SkillFormContainer />
    }
];

export default skill