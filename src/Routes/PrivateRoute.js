import {
    Outlet,
    Navigate
  } from 'react-router-dom';
  
  function PrivateRoute({ children, isAuthenticated, ...rest }) {
    return isAuthenticated? <Outlet/>: <Navigate to="/login"/>
  }
  
  
  export default PrivateRoute;