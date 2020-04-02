import React from 'react'

import { DMenu } from 'dmenu-react'
import 'dmenu-react/dist/index.css'

const App = () => {
  let menu = [
    {
      name: "Home",
      url: ""
    },
    {
      name: "Education",
      url: "#education"
    },
    {
      name: "Experience",
      url: "#experience"
    },
    {
      name: "Skills",
      url: "#skills"
    },
    {
      name: "Projects",
      url: "#projects"
    },
    {
      name: "Research",
      url: "#research"
    },
    {
      name: "Contacts",
      url: "#contacts"
    }
  ];
  return <DMenu menu={menu} active={getActive(menu)} />
}

function getActive(menu) {
  for (const [index, value] of menu.entries()) {
    if (value.url === window.location.hash) {
      return index
    }
  }
}

export default App
