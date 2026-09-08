import RoleRoute from "./RoleRoute";

const AdminRoute = ({ children }) => <RoleRoute role="admin">{children}</RoleRoute>;

export default AdminRoute;
