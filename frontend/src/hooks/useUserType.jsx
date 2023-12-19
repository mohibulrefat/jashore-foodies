import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
const useUserType = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: data, isLoading: isUserTypeLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["data", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://jashore-foodies-backend.vercel.app/role/${user?.email}`
      );
      return res?.data;
    },
  });
  return { ...data, isUserTypeLoading };
};

export default useUserType;
