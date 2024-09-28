import { TableColumn } from "react-data-table-component";
import DeleteItem from "../../../components/Table/DeleteButton.tsx";
import TableActions from "../../../components/Table/TableActions.tsx";
interface tag {
    _id: string;
    name: string;
    color: string;
  }
const generateActions = (row: tag, props) => {
    const {handleDelete} = props;
    const actions = [
        <DeleteItem handleDelete={() => handleDelete(row._id)} key={1}/>
    ]

    return <TableActions actions={actions}/>
}

const getTagsColumns = (props): TableColumn<tag>[] => {
    return [
        {
            sortable: true,
            name: 'ID',
            // minWidth: '250px',
            selector: row => row._id
        },
        {
            sortable: true,
            name: 'Name',
            // minWidth: '250px',
            selector: row => row.name
        },
        {
            sortable: true,
            name: 'Color',
            // minWidth: '250px',
            cell: row => <span style={{background: row.color}} className="p-2 rounded-lg shadow-md">{row.color}</span>
        },
        {
            name: 'Actions',
            // minWidth: '100px',
            cell: row => generateActions(row, props)
        }
    ];
}

export default getTagsColumns