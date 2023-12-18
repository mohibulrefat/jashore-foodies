import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../provider/AuthProvider";

const PaymentHistory = () => {
  const [payment, setPayment] = useState([])
  const { user, loading } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const userpaymenthistoryResponse = await fetch(
          `http://localhost:3000/userpaymenthistory/${user?.email}`
        );
        const data = await userpaymenthistoryResponse.json();
        setPayment(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  return (
    <div>PaymentHistory {payment.length}</div>
  )
}

export default PaymentHistory