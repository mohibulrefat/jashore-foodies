import axios from "axios";
import { useEffect, useState } from "react";
import VerifyRestaurantCard from "./VerifyRestaurantCard";
const VerifyRestaurant = () => {
  const [restaurnts, setRestaurants] = useState([]);
  const [fetchstate, setFetchstate] = useState(false);
  useEffect(() => {
    axios
      .get("https://jashore-foodies-backend.vercel.app/pendingrestaurnt")
      .then((response) => setRestaurants(response.data));
  }, [fetchstate]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {restaurnts.map((restaurant) => (
        <VerifyRestaurantCard
          key={restaurant._id}
          restaurant={restaurant}
          fetchstate={fetchstate}
          setFetchstate={setFetchstate}
        ></VerifyRestaurantCard>
      ))}
    </div>
  );
};

export default VerifyRestaurant;
