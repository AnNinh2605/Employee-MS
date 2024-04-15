import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axiosConfig from './utils/axiosConfig.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
axiosConfig();
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
