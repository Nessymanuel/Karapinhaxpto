import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CategoryForm } from './components/CategoryForm/index.tsx'
import { ManageCategories } from './components/ManageCategories/index.tsx'
import { AdminDashboard } from './screens/AdminDashboard/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* <App /> */}
        {/* <CategoryForm/> */}
        {/* <ManageCategories/> */}
        <AdminDashboard/>
    </React.StrictMode>,
)