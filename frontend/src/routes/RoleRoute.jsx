import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";
import RouteSpinner from "./RouteSpinner";

const RoleRoute = ({ role, children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <RouteSpinner />;
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RoleRoute;
