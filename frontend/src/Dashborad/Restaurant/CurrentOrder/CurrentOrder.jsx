import moment from "moment";
import { useContext, useEffect, useState } from "react";
import useSectionTitle from "../../../hooks/useSectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const CurrentOrder = () => {
    const [fetchstate, setfetchState] = useState(false);
  const [orders, setOrders] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const response = await fetch(
          `http://localhost:3000/currentorders/${user?.email}`
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading, fetchstate]);
  const handleDelivered = async (id) => {
        const response = await axios.delete(
          `http://localhost:3000/deliveredorder/${id}`
        );
        if(response.data.acknowledged){
            setfetchState(!fetchstate)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Delevery Status Updated.',
              showConfirmButton: false,
              timer: 700
          });
          }
  };
  const handleCancel = async (id) => {
        const response = await axios.delete(
          `http://localhost:3000/cancelorder/${id}`
        );
        if(response.data.acknowledged){
            setfetchState(!fetchstate)
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Order Cancelled.',
              showConfirmButton: false,
              timer: 700
          });
          }
  };
  return (
    <div>
      order Order
      <div className="px-5 border-l-2 ml-5 mt-2">
        {useSectionTitle("Current Orders")}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td className="">
                    <img
                      className="w-9 mx-auto"
                      src={order.item.photo}
                      alt=""
                    />
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
                    {moment(order.time).startOf("hour").fromNow()}
                  </td>
                  {/* <td>{moment(order.time).startOf("hour").fromNow()}</td> */}
                  <td>{order.customerContact}</td>
                  <td>{order.instruction}</td>
                  <td className="flex gap-1 justify-center tables-center">
                    <button onClick={()=>handleDelivered(order._id)} className="btn bg-green-500 btn-ghost btn-xs text-white">
                      Delivered
                    </button>
                    <button onClick={()=>handleCancel(order._id)} className="btn bg-red-500 btn-ghost btn-xs text-white">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrentOrder;
