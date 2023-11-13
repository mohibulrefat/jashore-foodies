import axios from "axios";
import { useEffect, useState } from "react";
import VerifyRestaurantCard from "./VerifyRestaurantCard";
const VerifyRestaurant = () => {
  const [restaurnts, setRestaurants] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/pendingrestaurnt")
      .then((response) => setRestaurants(response.data));
  }, []);
  return (
    <div className="grid grid-cols-2 gap-3">
      {restaurnts.map((restaurant) => (
        <VerifyRestaurantCard
          key={restaurant._id}
          restaurant={restaurant}
        ></VerifyRestaurantCard>
      ))}
    </div>
  );
};

export default VerifyRestaurant;
