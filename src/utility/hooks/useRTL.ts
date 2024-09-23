import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {RootState} from "../../redux/store.ts";
import {handleRTL} from "../../redux/layout.ts";
import {LayoutPageDirection} from "../../types/layout.ts";

export const useRTL = () => {
  const dispatch = useDispatch()
  const isRtl: LayoutPageDirection = useSelector((state: RootState) => state.layout.isRTL)
  const setValue = (value: LayoutPageDirection) => {
    dispatch(handleRTL(value))
  }

  useEffect(() => {
    const element = document.getElementsByTagName("html")[0]

    if (isRtl) {
      element.setAttribute("dir", "rtl")
    } else {
      element.setAttribute("dir", "ltr")
    }
  }, [isRtl])

  return [isRtl, setValue]
}
