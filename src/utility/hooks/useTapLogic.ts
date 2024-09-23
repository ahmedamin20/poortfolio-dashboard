import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const useTapLogic = ({defaultChecked = 0}) => {
    const location = useLocation();
    const initialActiveTab = location.state?.activeTab ?? defaultChecked;
    const [active, setActive] = useState(initialActiveTab);
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state?.activeTab !== undefined) {
            setActive(location.state.activeTab);
        }
    }, [location.state]);

    const handleClick = (event: MouseEvent, index: number, href: string|null = null) => {
        event.preventDefault();

        if (index === active) {
            return;
        }

        setActive(index)

        if (href) {
            navigate(href, {replace: true, state: {activeTab: index}});
        }
    };

    return {
        active,
        handleClick
    }
}

useTapLogic.propTypes = {
    defaultChecked: PropTypes.number
}

export default useTapLogic;
