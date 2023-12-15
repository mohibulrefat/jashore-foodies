import { useEffect, useState } from "react";
import RestaurantsCard from "./RestaurantsCard";

const Restaurants = () => {
  const [restarents, setRestaurants] = useState([]);
  useEffect(() => {
    fetch("restaurants.json")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <h1>Resturents</h1>
      <div className="grid grid-cols-3 gap-7">
        {restarents.map((restu) => (
          <RestaurantsCard
            key={restu.restaurantId}
            restu={restu}
          ></RestaurantsCard>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
