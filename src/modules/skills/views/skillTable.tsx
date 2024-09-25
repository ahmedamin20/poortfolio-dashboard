import {toastLoader} from "../../../utility/helpers/toastHelper";
import getColumns from "./columns";
import {parseRoute} from "../../../utility/helpers/routeHelper";
import skillRoutes from "../constants/routes";
import SkillTableObject from "../interfaces/skillTableObject.ts";
import CustomTable from "../../../components/Table/CustomTable.tsx";
import AddButton from "../../../components/Table/AddButton.tsx";

const SkillTable =  ({ data, handleDelete, loading }) => {
    const buttons = [<AddButton to={skillRoutes.ADD} key={0}/>]
    const routeParser = (row: SkillTableObject) => {
        const {_id} = row;
        return parseRoute(skillRoutes.EDIT, {_id})
    };

    toastLoader(loading)

    return <CustomTable
        buttons={buttons}
        columns={getColumns({ handleDelete, routeParser })}
        data={data}
        title='Skills'
    />
}

export default SkillTable