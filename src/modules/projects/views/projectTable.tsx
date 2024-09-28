import {toastLoader} from "../../../utility/helpers/toastHelper";
import getColumns from "./columns";
import {parseRoute} from "../../../utility/helpers/routeHelper";
import projectRoutes from "../constants/routes";
import projectsTableObject from "../interfaces/projectObject.ts";
import CustomTable from "../../../components/Table/CustomTable.tsx";
import AddButton from "../../../components/Table/AddButton.tsx";

const ProjectTable =  ({ data, handleDelete, loading }) => {
    const buttons = [<AddButton to={projectRoutes.ADD} key={0}/>]
    const routeParser = (row: projectsTableObject) => {
        const {_id} = row;
        return parseRoute(projectRoutes.EDIT, {_id})
    };

    toastLoader(loading)

    return <CustomTable
        buttons={buttons}
        columns={getColumns({ handleDelete, routeParser })}
        data={data}
        title='Projects'
    />
}

export default ProjectTable