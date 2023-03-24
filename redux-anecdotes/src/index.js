import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import configStore from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={configStore}>
    <App />
  </Provider>
)

