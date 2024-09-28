import { TableColumn } from 'react-data-table-component';
import ProjectTableObject from '../interfaces/projectTableObject.ts';
import EditItem from '../../../components/Table/EditItem.tsx';
import DeleteItem from '../../../components/Table/DeleteButton.tsx';
import TableActions from '../../../components/Table/TableActions.tsx';
import Avatar from '../../../components/Avatar.tsx';
import { Link } from 'react-router-dom';

const generateActions = (row: ProjectTableObject, props) => {
  const { handleDelete, routeParser } = props;
  const actions = [
    <EditItem tag="a" href={routeParser(row)} key={0} />,
    <DeleteItem handleDelete={() => handleDelete(row._id)} key={1} />,
  ];

  return <TableActions actions={actions} />;
};

const getColumns = (props): TableColumn<ProjectTableObject>[] => {
  return [
    {
      sortable: true,
      name: 'ID',
      minWidth: '250px',
      selector: (row) => row._id,
    },
    {
      name: 'name',
      minWidth: '250px',
      selector: (row) => row.name,
    },
    {
      name: 'Image',
      minWidth: '250px',
      cell: (row) => <Avatar src={row.image} />,
    },
    {
      name: 'Link',
      minWidth: '250px',
      cell: (row) => <Link className='bg-primary p-2 flex flex-row gap-x-2 text-whit hover:bg-transparent border border-transparent hover:text-primary hover:border-primary transition-all duration-[0.5s] text-white justify-between flex-nowrap rounded-md shadow-lg' to={row.source_code_link}>Link</Link>,
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: (row) => generateActions(row, props),
    },
  ];
};

export default getColumns;
