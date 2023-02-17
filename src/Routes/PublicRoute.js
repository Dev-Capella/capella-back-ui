import { Navigate,Outlet } from "react-router-dom";
const  PublicRoutes=({ children, isAuthenticated, ...rest }) =>{

  return isAuthenticated? <Navigate to="/"/>: <Outlet/>
}

export default PublicRoutes;