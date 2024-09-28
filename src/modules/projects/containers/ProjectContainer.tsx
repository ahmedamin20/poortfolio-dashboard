import {lazy, useEffect} from "react";
import useProjectLogic from "../hooks/useProjectLogic.ts";

const ProjectTable = lazy(() => import('../views/projectTable'))

const ProjectContainer = () => {
    const {all, allLoading, deleteLoading, getAllProjectsLogic, deleteProjectLogic} = useProjectLogic()

    useEffect(() => {
        getAllProjectsLogic()
    }, []);

    return <ProjectTable
        loading={allLoading || deleteLoading}
        data={all}
        handleDelete={deleteProjectLogic}
    />
}

export default ProjectContainer;