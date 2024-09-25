import {Link} from "react-router-dom";

const LinkDropDownItem = ({href, onClick = () => {}, children}) => {
    return <Link to={href} onClick={onClick} color='transparent' className='btn btn-icon'>
        {children}
    </Link>
}

export default LinkDropDownItem;