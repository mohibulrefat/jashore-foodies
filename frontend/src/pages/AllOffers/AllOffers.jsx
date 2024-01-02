import { useContext, useEffect, useState } from "react";
import useSectionTitle from "../../hooks/useSectionTitle";
import { AuthContext } from "../../provider/AuthProvider";
import AllOffersCard from "./AllOffersCard";

export const AllOffers = () => {
  const { user, loading } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const response = await fetch(
          `https://jashore-foodies-backend.vercel.app/offers`
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  return (
    <div>
      {useSectionTitle("All Offers", "Discover our latest offers")}
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
        {items.map((item) => (
          <AllOffersCard key={item._id} item={item}></AllOffersCard>
        ))}
      </div>
    </div>
  );
};
