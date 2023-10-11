import { useEffect, useState } from "react";

const Trending = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("trending.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  return <div>
    {items.map(item => <Trending key={item.itemId} item = {item}></Trending>)}
  </div>;
};

export default Trending;
