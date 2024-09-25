
import { MdEdit } from "react-icons/md";
import LinkItem from "../LinkItem";

interface EditDropDownItemProps {
    href?: string;
    onClick?: () => void;
    [key: string]: any; // To allow any additional props
}

const EditItem = ({href, onClick = () => {}, ...props}: EditDropDownItemProps) => {
    return <LinkItem href={href} onClick={onClick} className="bg-meta-5 text-white hover:border-meta-5 hover:bg-white hover:text-meta-5 transition-all duration-[0.5s]" {...props}>
        <MdEdit className='font-medium-2' />
    </LinkItem>
}

export default EditItem;