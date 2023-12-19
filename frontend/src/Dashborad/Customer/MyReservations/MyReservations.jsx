import { useContext, useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { MdOutlineTableBar } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import useSectionTitle from "../../../hooks/useSectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";
const MyReservations = () => {
  const { user, loading } = useContext(AuthContext);
  const [reserved, setReserved] = useState([]);
  const [reservedHistory, setReservedHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
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
  console.log(reserved);
  return (
    <div>
      {useSectionTitle("Current Reservations")}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {reserved.map((item) => (
          <div
            key={item._id}
            className="p-5 bg-[#fff8ee] rounded shadow shadow-red-200"
          >
            <img
              className="rounded shadow-2xl shadow-red-200 h-72 w-full"
              src={item.table.photo}
              alt=""
            />
            <div className="flex justify-between mt-2 border-b-2 border-red-400 pb-1">
              <h1 className="text-xl text-[#3E312D] font-[700] font-inter">
                <span className="uppercase">{item.table.shape}</span> Table
              </h1>
              <p className="text-xl font-semibold flex gap-2">
                <span className="text-lg">from</span>
                <span>{item.table.restaurantName}</span>
              </p>
            </div>
            <div>
              <div className="text-xl font-semibold flex justify-between mt-1">
                <h1>
                  Size: {item.table.length} X {item.table.width} feet
                </h1>
                <h4 className="flex items-center justify-end">
                  <TbCurrencyTaka size={25}></TbCurrencyTaka>
                  <span>{parseFloat(item.table.price).toFixed(2)}/Hour</span>
                </h4>
              </div>
            </div>
            <div className="flex justify-between my-1">
              <p
                className="bg-[#ADBC76] text-[#3E312D] text-base py-1 font-poppins rounded-2xl min-w-[70px] text-center"
                style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
              >
                Square
              </p>
              <p
                className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
                style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
              >
                Capacity: {item.table.capacity}
              </p>
            </div>
            <p className="py-2">{item.table.description}</p>
            <div className="h-10 flex justify-between items-center ">
              {/* <Link to={`/restaurantdetails/${restaurantEmail}`}> */}
              <Link to={`/restaurantdetails/${item.table.restaurantId}`}>
                <button className="bg-gray-200 flex items-center text-[#E94339] hover:text-white hover:bg-[#E94339] p-1 rounded-full px-3">
                  <BiDetail size={20}></BiDetail>
                  <p>Restaurant Details</p>
                </button>
              </Link>
              <Link>
                <button className="bg-gray-200 flex items-center text-[#E94339] hover:text-white hover:bg-[#E94339] p-1 rounded-full px-3">
                  <MdOutlineTableBar size={20} />
                  <p>Add Feedback</p>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {useSectionTitle("Reservations History")}
      <div className="grid grid-cols-1 lg:grid-cols-2 my-5 ">
        {reservedHistory.map((item) => (
          <div
            key={item._id}
            className="p-5 bg-[#fff8ee] rounded shadow shadow-red-200"
          >
            <img
              className="rounded shadow-2xl shadow-red-200 h-72 w-full"
              src={item.table.photo}
              alt=""
            />
            <div className="flex justify-between mt-2 border-b-2 border-red-400 pb-1">
              <h1 className="text-xl text-[#3E312D] font-[700] font-inter">
                <span className="uppercase">{item.table.shape}</span> Table
              </h1>
              <p className="text-xl font-semibold flex gap-2">
                <span className="text-lg">from</span>
                <span>{item.restaurantName}</span>
              </p>
            </div>
            <div>
              <div className="text-xl font-semibold flex justify-between mt-1">
                <h1>
                  Size: {item.table.length} X {item.table.width} feet
                </h1>
                <h4 className="flex items-center justify-end">
                  <TbCurrencyTaka size={25}></TbCurrencyTaka>
                  <span>{parseFloat(item.table.price).toFixed(2)}/Hour</span>
                </h4>
              </div>
            </div>
            <div className="flex justify-between my-1">
              <p
                className="bg-[#ADBC76] text-[#3E312D] text-base py-1 font-poppins rounded-2xl min-w-[70px] text-center"
                style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
              >
                Square
              </p>
              <p
                className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
                style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
              >
                Capacity: {item.table.capacity}
              </p>
            </div>
            <p className="py-2">{item.table.description}</p>
            <div className="h-10 flex justify-between items-center ">
              {/* <Link to={`/restaurantdetails/${restaurantEmail}`}> */}
              <Link to={`/restaurantdetails/${item.table.restaurantId}`}>
                <button className="bg-gray-200 flex items-center text-[#E94339] hover:text-white hover:bg-[#E94339] p-1 rounded-full px-3">
                  <BiDetail size={20}></BiDetail>
                  <p>Restaurant Details</p>
                </button>
              </Link>
              <Link>
                <button className="bg-gray-200 flex items-center text-[#E94339] hover:text-white hover:bg-[#E94339] p-1 rounded-full px-3">
                  <MdOutlineTableBar size={20} />
                  <p>Add Feedback</p>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReservations;
