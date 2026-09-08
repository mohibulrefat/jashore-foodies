import { useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { AuthContext } from "../provider/AuthContext";

const useRestaurantApproval = () => {
  const { user } = useContext(AuthContext);
  const [isRestaurantApprovad, setIsRestaurantApprovad] = useState(null);

  useEffect(() => {
    if (user?.role !== "restaurant") {
      setIsRestaurantApprovad(null);
      return;
    }
    api
      .get("/restaurant/isrestaurantapproved")
      .then((res) => setIsRestaurantApprovad(res.data))
      .catch(() => setIsRestaurantApprovad(false));
  }, [user]);

  return isRestaurantApprovad;
};

export default useRestaurantApproval;
