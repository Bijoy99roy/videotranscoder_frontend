import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export function LoggedInRoutes({ children }:{children:any}){
    const { user } = useContext(AuthContext);
    const isAuthenticated = (user && user.id) ? true : false;
    return isAuthenticated ?  <Navigate to="/" replace/> : children
}