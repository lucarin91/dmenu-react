import React from 'react'

import { DMenu } from 'dmenu-react'
import 'dmenu-react/dist/index.css'

const App = () => {
  let menu = [
    {
      name: "~/",
      url: ""
    },
    {
      name: "~/education",
      url: "#education"
    },
    {
      name: "~/experience",
      url: "#experience"
    },
    {
      name: "~/projects",
      url: "#projects"
    },
    {
      name: "~/skills",
      url: "#skills"
    },
    {
      name: "~/research",
      url: "#research"
    },
    {
      name: "~/contacts",
      url: "#contacts"
    }
  ];
  return <div><DMenu menu={menu} active={getActive(menu)} />
    <div>
      <p>Some content of the site</p>
    </div>
  </div>
}

function getActive(menu) {
  for (const [index, value] of menu.entries()) {
    if (value.url === window.location.hash) {
      return index
    }
  }
}

export default App
