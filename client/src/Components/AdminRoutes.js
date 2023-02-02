import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';


const AdminRoutes = ({isLoggedin, role}) => {
    return isLoggedin && role ==='Admin'? <Outlet/> : <Navigate to={'/home'}/>
}

export default AdminRoutes