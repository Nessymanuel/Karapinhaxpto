import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppointmentForm } from '../src/screens/AppointtmentForm'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LandinPage } from './screens/LandingPage/index.tsx'
import { Login } from './screens/Login/index.tsx'
import {Dashboard }from './screens/Dashboard/index.tsx'
import { SignUp } from './screens/SignUp/index.tsx'
import { Form } from './components/Form/index.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' Component={App} />
        <Route path='/AppointmentForm' Component={AppointmentForm} />
        <Route path='/LandingPage' Component={LandinPage} />
        <Route path='/Login' Component={Login} />
        <Route path='/SignUp' Component={SignUp} />
        <Route path='/Form' Component={Form} />
        <Route path='/Dashboard' Component={Dashboard} />
      </Routes>
    </Router>

  </React.StrictMode>,
)

