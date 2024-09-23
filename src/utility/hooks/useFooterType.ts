import { useDispatch, useSelector } from "react-redux"
import {RootState} from "../../redux/store.ts";
import {handleFooterType} from "../../redux/layout.ts";
import {LayoutFooterType} from "../../types/layout.ts";

export const useFooterType = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout)

  const setFooterType = (type: LayoutFooterType) => {
    dispatch(handleFooterType(type))
  }

  return { setFooterType, footerType: store.footerType }
}
