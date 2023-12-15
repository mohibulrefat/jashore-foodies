import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant ] = useState(null);
    useEffect(() => {
      fetch(`http://localhost:3000/restaurantdetailswi/${restaurantId}`)
        .then(res => res.json())
        .then((data) => setRestaurant(data));
    },);

  return <div>RestaurantDetails of {restaurant?.restaurantname}</div>;
};

export default RestaurantDetails;
