import {Circle} from "react-feather";
import projectRoutes from "../constants/routes";

const sideBar = [
    {
        id: "project",
        title: "Projectses",
        icon: <Circle size={20} />,
        navLink: projectRoutes.TABLE
    }
];

export default sideBar