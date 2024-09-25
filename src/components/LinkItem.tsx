import {Link} from "react-router-dom";
import { cn } from "../utility/cn";

const LinkItem = ({href, onClick = () => {}, children, className}) => {
    return <Link to={href} onClick={onClick} className={cn("p-2 rounded-lg text-center mx-2 border", className)}>
        {children}
    </Link>
}

export default LinkItem;