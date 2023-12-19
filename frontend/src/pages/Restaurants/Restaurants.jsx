import { useEffect, useState } from "react";
import useSectionTitle from "../../hooks/useSectionTitle";
import RestaurantsCard from "./RestaurantsCard";

const Restaurants = () => {
  const [restarents, setRestaurants] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/allrestaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      {useSectionTitle(
        "All Restaurants",
        "Discover our latest restaurants and menu"
      )}
      <div className="grid grid-cols-3 gap-7">
        {restarents.map((restu) => (
          <RestaurantsCard key={restu._id} restu={restu}></RestaurantsCard>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
