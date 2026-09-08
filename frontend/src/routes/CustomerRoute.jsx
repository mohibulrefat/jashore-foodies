import RoleRoute from "./RoleRoute";

const CustomerRoute = ({ children }) => (
  <RoleRoute role="customer">{children}</RoleRoute>
);

export default CustomerRoute;
