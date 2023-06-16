import { HslColorPicker } from "react-colorful"
import { useDispatch, useSelector } from "react-redux"

import MountTransition from "../../utils/MountTransition"

import { getTheme, setDark, setTheme } from "../../store/themeSlice"

const Settings = () => {
  const dispatch = useDispatch()
  const theme = useSelector(getTheme)
  return (
    <MountTransition dashboard>
      <HslColorPicker
        color={theme}
        onChange={(color) => {
          if (color.l > 70) {
            document.querySelector("html").classList.add("dark")
            dispatch(setDark(true))
          } else {
            document.querySelector("html").classList.remove("dark")
            dispatch(setDark(false))
          }
          dispatch(setTheme(color))

          const body = document.querySelector("body")
          body.style.setProperty("--accent", `${color.h} ${color.s}% ${color.l}%`)
        }}
      />
    </MountTransition>
  )
}

export default Settings
