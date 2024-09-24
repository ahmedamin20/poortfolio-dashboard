// ** Router imports
import {useRoutes} from "react-router-dom"

// ** GetRoutes
import Routes from "./routes"


const Router = () => {
  const routing = useRoutes(Routes);

  return routing;
}

export default Router
