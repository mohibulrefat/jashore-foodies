import { useContext, useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { AuthContext } from "../../../provider/AuthProvider";

const MyReservations = () => {
  const { user, loading } = useContext(AuthContext);
  const [reserved, setReserved] = useState([]);
  const [reservedHistory, setReservedHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return (
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          );
        }
        const reservationResponse = await fetch(
          `http://localhost:3000/myreservations/${user?.email}`
        );
        const data = await reservationResponse.json();
        setReserved(data.result1);
        setReservedHistory(data.result2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  return <div>Current Reservations {reserved.length} <br />
    Reservations history {reservedHistory.length}</div>;
};

export default MyReservations;
