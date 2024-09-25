import {Link} from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const AddButton = (props) => {
    return <Link className={"bg-primary p-2 flex flex-row gap-x-2 text-whit hover:bg-transparent border border-transparent hover:text-primary hover:border-primary transition-all duration-[0.5s] text-white justify-between flex-nowrap rounded-md shadow-lg"} {...props}>
        <span className='text-center'>Add Record</span>
        <span><FaPlus className="mt-1" size={15} /></span>
    </Link>
}

export default AddButton;