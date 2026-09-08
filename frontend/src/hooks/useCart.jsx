import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import api from "../lib/api";
import { AuthContext } from "../provider/AuthContext";

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => (await api.get("/customer/carts")).data,
  });

  return [cart, refetch];
};

export default useCart;
