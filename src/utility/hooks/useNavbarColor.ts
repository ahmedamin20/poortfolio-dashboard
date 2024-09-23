// ** Store Imports
import { useDispatch, useSelector } from "react-redux"
import {RootState} from "../../redux/store.ts";
import {handleNavbarColor} from "../../redux/layout.ts";
import {LayoutNavbarBackgroundType} from "../../types/layout.ts";

export const useNavbarColor = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout)

  // ** Return a wrapped version of useState's setter function
  const setNavbarColor = (value: LayoutNavbarBackgroundType) => {
    dispatch(handleNavbarColor(value))
  }

  return { navbarColor: store.navbarColor, setNavbarColor }
}
