import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {RootState} from "../../redux/store.ts";
import {handleSkin} from "../../redux/layout.ts";
import {LayoutSkin} from "../../types/layout.ts";

export const useSkin = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout)

  const setSkin = (type: LayoutSkin) => {
    dispatch(handleSkin(type))
  }

  useEffect(() => {
    const element = window.document.body

    const classNames = {
      dark: "dark-layout",
      bordered: "bordered-layout",
      "semi-dark": "semi-dark-layout"
    }

    element.classList.remove(...element.classList)

    if (store.skin !== "light") {
      element.classList.add(classNames[store.skin])
    }
  }, [store.skin])

  return { skin: store.skin, setSkin }
}
