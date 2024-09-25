import {lazy, useEffect} from "react";
import useSkillLogic from "../hooks/useSkillLogic.ts";

const SkillTable = lazy(() => import('../views/skillTable'))

const SkillContainer = () => {
    const {all, allLoading, deleteLoading, getAllSkillsLogic, deleteSkillLogic} = useSkillLogic()

    useEffect(() => {
        getAllSkillsLogic()
    }, []);
    console.log(all)
    return <SkillTable
        loading={allLoading || deleteLoading}
        data={all}
        handleDelete={deleteSkillLogic}
    />
}

export default SkillContainer;