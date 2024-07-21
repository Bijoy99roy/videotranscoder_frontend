import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { SpinLoader } from "../components/loaders/SpinLoader";

export function PrivateRoutes({ children }:{children:any}){
    const { user, loading } = useContext(AuthContext);
    let isAuthenticated = (user && user.id) ? true : false;
    if (loading) {
    return <> <SpinLoader /> </>;
  }
    return isAuthenticated ? children : <Navigate to="/" replace/>
}