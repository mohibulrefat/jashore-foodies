import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const MyOrders = () => {
  const { user, loading } = useContext(AuthContext);
  const [current, setCurrent] = useState([]);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const reservationResponse = await fetch(
          `http://localhost:3000/myorders/${user?.email}`
        );
        const data = await reservationResponse.json();
        setCurrent(data.result1);
        setHistory(data.result2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  return (
    <div>
      <div>Current {current.length}</div>
      <div>Delivered {history.length}</div>
    </div>
  );
};

export default MyOrders;
