import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../lib/api";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    api
      .get(`/restaurantdetailswi/${restaurantId}`)
      .then(({ data }) => setRestaurant(data));
  }, [restaurantId]);

  return <div>RestaurantDetails of {restaurant?.restaurantname}</div>;
};

export default RestaurantDetails;
