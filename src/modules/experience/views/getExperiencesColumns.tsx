import { TableColumn } from 'react-data-table-component';
import DeleteItem from '../../../components/Table/DeleteButton.tsx';
import TableActions from '../../../components/Table/TableActions.tsx';
interface Project {
  projectName: string;
  projectUrl: string;
  _id: string;
}

const generateActions = (row: Project, props) => {
  const { handleDelete } = props;
  const actions = [
    <DeleteItem handleDelete={() => handleDelete(row._id)} key={1} />,
  ];

  return <TableActions actions={actions} />;
};

const getExperiencesColumns = (props): TableColumn<Project>[] => {
  return [
    {
      sortable: true,
      name: 'ID',
      selector: (row) => row._id,
    },
    {
      sortable: true,
      name: 'Project Name',
      selector: (row) => row.projectName,
    },
    {
      sortable: true,
      name: 'Project URL',
      selector: (row) => row.projectUrl,
    },
    {
      name: 'Actions',
      cell: (row) => generateActions(row, props),
    },
  ];
};

export default getExperiencesColumns;
