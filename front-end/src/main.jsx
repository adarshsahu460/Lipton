import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import {ToastContainer} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer />
  </>,
)
