import moment from "moment";
import { useContext, useEffect, useState } from "react";
import useSectionTitle from "../../../hooks/useSectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const response = await fetch(
          `https://jashore-foodies-backend.vercel.app/orderhistory/${user?.email}`
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  return (
    <div className="px-5 border-l-2 ml-5 mt-2">
      {useSectionTitle("Order History")}
      <div className="overflow-x-auto mt-2">
        <table className="table text-center">
          {/* head */}
          <thead className="bg-[#E94339]">
            <tr className="text-white">
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Customer Name</th>
              <th>Time</th>
              <th>Contract</th>
              <th>Instructions</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody className="">
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td className="">
                  <img className="w-9 mx-auto" src={order.item.photo} alt="" />
                </td>
                <td>{order.item.name}</td>
                <td>
                  {(
                    order.item.price -
                    (order.item.price * order.item.offer) / 100
                  ).toFixed(2)}
                </td>

                <td>{order.customerName}</td>
                <td className="capitalize">
                  {moment(order.time).format("LLL")}
                </td>
                {/* <td>{moment(order.time).startOf("hour").fromNow()}</td> */}
                <td>{order.customerContact}</td>
                <td>{order.instruction}</td>
                <td>{order.deliveryStatus}</td>
                <td className="flex gap-1 justify-center tables-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
