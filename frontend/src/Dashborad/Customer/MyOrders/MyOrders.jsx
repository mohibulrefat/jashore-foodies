import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { TbCurrencyTaka } from "react-icons/tb";
import useSectionTitle from "../../../hooks/useSectionTitle";
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
  console.log(current);
  return (
    <div>
      {useSectionTitle("Delivery Pending")}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        {current.map((currentitem) => (
          <div
            key={currentitem._id}
            className={`flex flex-col justify-between p-5 bg-[#fff8ee] rounded shadow shadow-red-200 relative`}
          >
            <p className="bg-[#E94339] text-white rounded-xl p-2 absolute right-1 top-1">
              Orderd {moment(currentitem.time).startOf("hour").fromNow()}
            </p>
            <div>
              <img
                className="rounded shadow-2xl shadow-red-200 w-full h-48"
                src={currentitem.item.photo}
                alt=""
              />
              <div className="flex justify-between mt-2 border-b-2 border-red-400">
                <h1 className="text-lg text-[#3E312D] font-[700] font-inter">
                  {currentitem.item.name}
                </h1>
                <div className="flex justify-between items-center text-xl font-semibold">
                  <p>{currentitem.amount.toFixed(2)}</p>
                  <TbCurrencyTaka></TbCurrencyTaka>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-base text-right mb-2">
                  from{" "}
                  <span className="font-semibold ">
                    {currentitem.item.restaurantName}
                  </span>
                </h4>
              </div>

              <div className="flex justify-between my-1">
                <p
                  className="bg-[#ADBC76] text-[#3E312D] text-base py-1 font-poppins rounded-2xl min-w-[70px] text-center"
                  style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
                >
                  {currentitem.item.ingredients.ing1}
                </p>
                <p
                  className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
                  style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
                >
                  {currentitem.item.ingredients.ing2}
                </p>
                <p
                  className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
                  style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
                >
                  {currentitem.item.ingredients.ing3}
                </p>
              </div>
              <p className="py-2">{currentitem.item.description}</p>
            </div>
            <div className="h-10 flex justify-between items-center mt-2">
              <button className=" flex items-center hover:border hover:border-[#E94339] p-1 rounded-full">
                <BiDetail className="text-[#E94339]" size={20}></BiDetail>
                <p>Details</p>
              </button>
            </div>
          </div>
        ))}
      </div>
      {useSectionTitle("Order History")}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {history.map((historyitem) => (
          <div
            key={historyitem._id}
            className={`flex flex-col justify-between p-5 bg-[#fff8ee] rounded shadow shadow-red-200 relative`}
          >
            <div>
              <img
                className="rounded shadow-2xl shadow-red-200 w-full h-48"
                src={historyitem.item.photo}
                alt=""
              />
              <div className="flex justify-between mt-2 border-b-2 border-red-400">
                <h1 className="text-lg text-[#3E312D] font-[700] font-inter">
                  {historyitem.item.name}
                </h1>
                <div className="flex justify-between items-center text-xl font-semibold">
                  <p>{historyitem.amount}</p>
                  <TbCurrencyTaka></TbCurrencyTaka>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-base text-right mb-2">
                  from{" "}
                  <span className="font-semibold ">
                    {historyitem.item.restaurantName}
                  </span>
                </h4>
              </div>

              <div className="flex justify-between my-1">
                <p
                  className="bg-[#ADBC76] text-[#3E312D] text-base py-1 font-poppins rounded-2xl min-w-[70px] text-center"
                  style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
                >
                  {historyitem.item.ingredients.ing1}
                </p>
                <p
                  className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
                  style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
                >
                  {historyitem.item.ingredients.ing2}
                </p>
                <p
                  className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
                  style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
                >
                  {historyitem.item.ingredients.ing3}
                </p>
              </div>
              <p className="py-2">{historyitem.item.description}</p>
              <div className="flex justify-between items-center">
                <p className=" text-black rounded-xl bg-gray-200 p-2">
                  Date: {moment(historyitem.time).format("ll")}
                </p>
                <p className="capitalize text-black rounded-xl bg-gray-200 p-2">
                  {historyitem.deliveryStatus}
                </p>
              </div>
            </div>
            <div className="h-10 flex justify-between items-center mt-2">
              <button className=" flex items-center hover:border hover:border-[#E94339] p-1 rounded-full">
                <BiDetail className="text-[#E94339]" size={20}></BiDetail>
                <p>Details</p>
              </button>
              <button className=" flex items-center hover:border hover:border-[#E94339] p-1 rounded-full">
                <BiDetail className="text-[#E94339]" size={20}></BiDetail>
                <p>Add Review</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
