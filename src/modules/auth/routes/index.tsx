import {lazy} from "react"
import {LOGIN_ROUTE} from "../constants/routes";
import RouteInterface from "../../../interfaces/route.ts";

const LoginController = lazy(() => import("../containers/LoginContainer"))

export const authRoutes: RouteInterface[] = [
    {
        path: LOGIN_ROUTE,
        element: <LoginController/>,
        meta: {
            layout: "blank"
        }
    }
]