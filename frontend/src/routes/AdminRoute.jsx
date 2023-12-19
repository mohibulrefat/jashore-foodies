import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { AuthContext } from "../provider/AuthProvider";
import useUserType from "../hooks/useUserType";

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const { isAdmin, isUserTypeLoading } = useUserType();

    if (loading || isUserTypeLoading) {
        return <div className="flex justify-center"><RingLoader  color="#e2136e"  className='text-center my-24'/></div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;