import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    fetch(
      `https://jashore-foodies-backend.vercel.app/restaurantdetailswi/${restaurantId}`
    )
      .then((res) => res.json())
      .then((data) => setRestaurant(data));
  });

  return <div>RestaurantDetails of {restaurant?.restaurantname}</div>;
};

export default RestaurantDetails;
