import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {UserContext} from './util/components/Context/userContex.jsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if(process.env.ENV==='PRODUCTION') disableReactDevTools()


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContext>
)
