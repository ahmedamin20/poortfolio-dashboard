import { CiCircleRemove } from "react-icons/ci";
import { handleConfirmText } from "../../utility/helpers/swalHelper";

const DeleteItem = ({ handleDelete = () => {} }) => {
    return (
        <>
            <button
                onClick={() => handleConfirmText(handleDelete)}
                color='transparent'
                className='btn btn-icon'
            >
                <CiCircleRemove className='font-medium-2' />
            </button>
        </>
    )
}

export default DeleteItem;