import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
const useCart = () => {
  const { user, loading } = useContext(AuthContext)
  // const token = localStorage.getItem('access-token');
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/carts/${user?.email}`);
      return res.data;
    },
  });

  return [cart, refetch];
};
export default useCart;
