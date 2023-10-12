import { useEffect, useState } from "react";
import RestaurentsCard from "./RestaurentsCard";

const Restaurents = () => {
  const [restarents, setRestaurents] = useState([]);
  useEffect(() => {
    fetch("restaurents.json")
      .then((res) => res.json())
      .then((data) => setRestaurents(data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <h1>Resturents Tables</h1>
      <div className="grid grid-cols-3 gap-7">
        {restarents.map((restu) => (
          <RestaurentsCard
            key={restu.restaurentId}
            restu={restu}
          ></RestaurentsCard>
        ))}
      </div>
    </div>
  );
};

export default Restaurents;
