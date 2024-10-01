import { TableColumn } from 'react-data-table-component';
import ExperienceTableObject from '../interfaces/experienceTableObject.ts';
import EditItem from '../../../components/Table/EditItem.tsx';
import DeleteItem from '../../../components/Table/DeleteButton.tsx';
import TableActions from '../../../components/Table/TableActions.tsx';

const generateActions = (row: ExperienceTableObject, props) => {
  const { handleDelete, routeParser } = props;
  const actions = [
    <EditItem tag="a" href={routeParser(row)} key={0} />,
    <DeleteItem handleDelete={() => handleDelete(row._id)} key={1} />,
  ];

  return <TableActions actions={actions} />;
};

const getColumns = (props): TableColumn<ExperienceTableObject>[] => {
  return [
    {
      sortable: true,
      name: 'ID',
      minWidth: '250px',
      selector: (row) => row._id,
    },
    {
      sortable: true,
      name: 'Title',
      minWidth: '250px',
      selector: (row) => row.title,
    },
    {
      sortable: true,
      name: 'Date',
      minWidth: '250px',
      selector: (row) => row.date,
    },
    {
      sortable: true,
      name: 'Company',
      minWidth: '250px',
      cell: (row) => (
        <div className="felx my-2 flex-col rounded-lg shadow-md gap-y-2 justify-center items-center p-2 px-4">
          <span className="font-[900] my-2 mb-5">{row.companyName}</span>
          <img
            src={row.logo}
            className="w-[50px] h-[50px] rounded-full mx-auto"
          />
        </div>
      ),
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: (row) => generateActions(row, props),
    },
  ];
};

export default getColumns;
