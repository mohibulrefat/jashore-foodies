import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useSectionTitle from "../../../hooks/useSectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";
const TableReservation = () => {
  const [fetchstate, setfetchState] = useState(false);
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
          `https://jashore-foodies-backend.vercel.app/tablereservations/${user?.email}`
        );
        const data = await reservationResponse.json();
        setCurrentReserved(data.result1);
        setReservedHistory(data.result2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading, fetchstate]);
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://jashore-foodies-backend.vercel.app/cancelreservation/${id}`
        );
        if (response.status === 200) {
          setfetchState(!fetchstate);
          Swal.fire("Finished!", "Your item has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete the item.", "error");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire(
          "Error!",
          "An error occurred while deleting the item.",
          "error"
        );
      }
    }
  };
  return (
    <div>
      <div className="px-5 border-l-2 ml-5 mt-2">
        {useSectionTitle("Currently Reserved")}
        <div className="overflow-x-auto mt-2">
          <table className="table text-center">
            {/* head */}
            <thead className="bg-[#E94339]">
              <tr className="text-white">
                <th>#</th>
                <th>Image</th>
                <th>Size (Sq feet)</th>
                <th>Shape</th>
                <th>Customer Name</th>
                <th>Start Time</th>
                <th>Contract</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {currentreserved.map((current, index) => (
                <tr key={current.table._id}>
                  <th>{index + 1}</th>
                  <td className="">
                    <img
                      className="w-9 mx-auto"
                      src={current.table.photo}
                      alt=""
                    />
                  </td>
                  <td>
                    {current.table.length} X {current.table.width}
                  </td>
                  <td className="uppercase">{current.table.shape}</td>
                  <td>{current.customerName}</td>
                  <td>{moment(current.time).startOf("hour").fromNow()}</td>
                  <td>{current.customerContact}</td>
                  <td className="flex gap-1 justify-center tables-center">
                    <button
                      onClick={() => handleCancel(current._id)}
                      className="btn bg-red-500 btn-ghost btn-xs text-white"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-5 border-l-2 ml-5 mt-2">
        {useSectionTitle("Reservation History")}
        <div className="overflow-x-auto mt-2">
          <table className="table text-center">
            {/* head */}
            <thead className="bg-[#E94339]">
              <tr className="text-white">
                <th>#</th>
                <th>Image</th>
                <th>Size (Sq feet)</th>
                <th>Shape</th>
                <th>Customer Name</th>
                <th>Time</th>
                <th>Contract</th>
                <th>Price(TK)</th>
              </tr>
            </thead>
            <tbody className="">
              {reservedHistory.map((history, index) => (
                <tr key={history.table._id}>
                  <th>{index + 1}</th>
                  <td className="">
                    <img
                      className="w-9 mx-auto"
                      src={history.table.photo}
                      alt=""
                    />
                  </td>
                  <td>
                    {history.table.length} X {history.table.width}
                  </td>
                  <td className="uppercase">{history.table.shape}</td>
                  <td>{history.customerName}</td>
                  <td>
                    {moment(history.time).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>{history.customerContact}</td>
                  <td>{history.table.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;
