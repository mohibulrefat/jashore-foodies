import { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";

// Role now comes straight from the authenticated session, no extra request.
const useUserType = () => {
  const { role, loading } = useContext(AuthContext);
  return {
    isCustomer: role === "customer",
    isRestaurant: role === "restaurant",
    isAdmin: role === "admin",
    isUserTypeLoading: loading,
  };
};

export default useUserType;
