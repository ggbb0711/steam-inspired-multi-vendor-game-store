import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {UserContext} from './pages/components/userContex.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContext>
)
