import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AppointmentForm } from '../screens/AppointtmentForm'
import { LandinPage } from '../screens/LandingPage/index.tsx'
import { Login } from '../screens/Login/index.tsx'
import { Dashboard } from '../screens/Dashboard/index.tsx'
import { SignUp } from '../screens/SignUp'
import { Form } from '../components/Form'
import { AdminDashboard } from '../screens/AdminDashboard/'




export function MyRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandinPage/>} />
                <Route path='/AppointmentForm' element={<AppointmentForm/>} />
                <Route path='/Login' element={<Login/>} />
                <Route path='/SignUp' element={<SignUp/>} />
                <Route path='/Form' element={<Form/>} />
                <Route path='/Dashboard' element={<Dashboard/>} />
                <Route path='/AdminDashboard' element={<AdminDashboard/>} />
            </Routes>
        </Router>
    );
}