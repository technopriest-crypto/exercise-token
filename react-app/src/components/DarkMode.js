import React from "react"
import { Button } from "react-bootstrap";
import "../styles/DarkMode.css"

export let graphColor
// trying to set the graph color to change based on the theme, but might be better to do with css on second through.

const DarkMode = () => {
  let clickedClass = "clicked"
  const body = document.body
  const lightTheme = "light"
  const darkTheme = "dark"
  let graphColor = ''
  let theme = ''

  if (localStorage) {
    theme = localStorage.getItem("theme")
  }
  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme)
  } else {
    body.classList.add(lightTheme)
  }

  const switchTheme = e => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme)
      e.target.classList.remove(clickedClass)
      localStorage.setItem("theme", "light")
      theme = lightTheme
      graphColor = 'black'
    } else {
      body.classList.replace(lightTheme, darkTheme)
      e.target.classList.add(clickedClass)
      localStorage.setItem("theme", "dark")
      theme = darkTheme
      graphColor = 'white'
    }
  }

  return <Button variant="default" className={theme === "dark" ? clickedClass : ""} id="darkMode" onClick={e => switchTheme(e)}>
            Theme
         </Button>
}

export default DarkMode
