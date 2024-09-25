import { BsFillBasketFill } from "react-icons/bs";
import skillRoutes from "../constants/routes";

const sideBar = [
    {
        id: "skill",
        title: "Skills",
        icon: <BsFillBasketFill size={20} />,
        navLink: skillRoutes.TABLE
    }
];

export default sideBar