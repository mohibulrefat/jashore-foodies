import { useEffect, useState } from "react";
import useSectionTitle from "../../hooks/useSectionTitle";
import ItemsCard from "./ItemsCard";

const Items = () => {
  const [allitems, setAllitems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jashore-foodies-backend.vercel.app/allitems`
        );
        const data = await response.json();
        // console.log(data);
        setAllitems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {useSectionTitle(
        "ALL ITEMS",
        "Discover all items from different restaurant"
      )}
      <div className="my-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
        {allitems.map((item) => (
          <ItemsCard key={item._id} item={item}></ItemsCard>
        ))}
      </div>
    </>
  );
};

export default Items;
