
import { MdEdit } from "react-icons/md";
import LinkDropDownItem from "../LinkItem";

interface EditDropDownItemProps {
    href?: string;
    onClick?: () => void;
    [key: string]: any; // To allow any additional props
}

const EditItem = ({href, onClick = () => {}, ...props}: EditDropDownItemProps) => {
    return <LinkDropDownItem href={href} onClick={onClick} {...props}>
        <MdEdit className='font-medium-2' />
    </LinkDropDownItem>
}

export default EditItem;