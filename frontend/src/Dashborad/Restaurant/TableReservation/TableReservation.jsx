import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const TableReservation = () => {
  const { user, loading } = useContext(AuthContext);
  const [currentreserved, setCurrentReserved] = useState([]);
  const [reservedHistory, setReservedHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const reservationResponse = await fetch(
          `http://localhost:3000/tablereservations/${user?.email}`
        );
        const data = await reservationResponse.json();
        setCurrentReserved(data.result1);
        setReservedHistory(data.result2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  return (
    <div>
      <div>Currently Reserved {currentreserved.length}</div>
      <div>Reservation History {reservedHistory.length}</div>
    </div>
  );
};

export default TableReservation;
