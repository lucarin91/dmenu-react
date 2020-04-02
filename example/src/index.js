import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'))
}
renderApp()

window.onhashchange = function () {
  renderApp()
};
