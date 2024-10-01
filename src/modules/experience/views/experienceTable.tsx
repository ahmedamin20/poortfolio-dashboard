import { toastLoader } from '../../../utility/helpers/toastHelper';
import getColumns from './columns';
import { parseRoute } from '../../../utility/helpers/routeHelper';
import experienceRoutes from '../constants/routes';
import ExperienceTableObject from '../interfaces/experienceTableObject.ts';
import AddButton from '../../../components/Table/AddButton.tsx';
import CustomTable from '../../../components/Table/CustomTable.tsx';

const ExperienceTable = ({ data, handleDelete, loading }) => {
  const buttons = [<AddButton to={experienceRoutes.ADD} key={0} />];
  const routeParser = (row: ExperienceTableObject) => {
    const { _id: id } = row;
    return parseRoute(experienceRoutes.EDIT, { id });
  };

  toastLoader(loading);

  return (
    <CustomTable
      buttons={buttons}
      columns={getColumns({ handleDelete, routeParser })}
      data={data}
      title="Experiences"
    />
  );
};

export default ExperienceTable;
