import { useDispatch, useSelector } from "react-redux"
import {RootState} from "../../redux/store.ts";
import {handleNavbarType} from "../../redux/layout.ts";
import {LayoutNavbarType} from "../../types/layout.ts";

export const useNavbarType = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout)

  const setNavbarType = (type: LayoutNavbarType) => {
    dispatch(handleNavbarType(type))
  }

  return { navbarType: store.navbarType, setNavbarType }
}
