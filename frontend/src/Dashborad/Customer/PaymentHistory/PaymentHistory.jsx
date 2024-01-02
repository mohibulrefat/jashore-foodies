import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const PaymentHistory = () => {
  const [payment, setPayment] = useState([]);
  const { user, loading } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const userpaymenthistoryResponse = await fetch(
          `https://jashore-foodies-backend.vercel.app/userpaymenthistory/${user?.email}`
        );
        const data = await userpaymenthistoryResponse.json();
        setPayment(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  return (
    <div>
      <div className="overflow-x-auto mt-2">
        <table className="table text-center">
          {/* head */}
          <thead className="bg-[#E94339]">
            <tr className="text-white">
              <th>#</th>
              <th>Payment For</th>
              <th>Item Name</th>
              <th>Restaurant Email</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody className="">
            {payment.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td className="capitalize">{data.itemType}</td>
                <td className="capitalize">
                  {data.table
                    ? `${data.table.length} X ${data.table.width} ${data.table.shape}`
                    : data.item.name}
                </td>
                <td>{data.restaurantEmail}</td>

                <td>{data.currency}</td>
                <td className="capitalize">{data.amount}</td>
                <td>{data.tranId}</td>
                <td>{moment(data.time).format("lll")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
