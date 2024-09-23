import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleLayout, handleLastLayout } from "../../redux/layout"
import {RootState} from "../../redux/store.ts";
import {LayoutType} from "../../types/layout.ts";

export const useLayout = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state.layout);
  const layout: LayoutType = store.layout;
  const lastLayout: LayoutType = store.lastLayout

  const setLayout = (value: LayoutType) => {
    dispatch(handleLayout(value))
  }

  const setLastLayout = (value: LayoutType) => {
    dispatch(handleLastLayout(value))
  }

  useEffect(() => {
    if (window) {
      const breakpoint = 1200

      if (window.innerWidth < breakpoint) {
        setLayout("vertical")
      }

      window.addEventListener("resize", () => {
        if (
            window.innerWidth <= breakpoint &&
            lastLayout !== "vertical" &&
            layout !== "vertical"
        ) {
          setLayout("vertical")
        }
        if (
            window.innerWidth >= breakpoint &&
            lastLayout !== layout
        ) {
          setLayout(lastLayout)
        }
    })
  }}, [layout])

  return {
    layout,
    setLayout,
    lastLayout,
    setLastLayout
  }
}
