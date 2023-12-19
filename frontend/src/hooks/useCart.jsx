import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  // const token = localStorage.getItem('access-token');
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `https://jashore-foodies-backend.vercel.app/carts/${user?.email}`
      );
      return res.data;
    },
  });

  return [cart, refetch];
};
export default useCart;
