import { BiDetail } from "react-icons/bi";
import { MdOutlineTableBar } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";

const ReserveTableCard = ({ table }) => {
  const {
    length,
    width,
    price,
    capacity,
    description,
    photo,
    shape,
    availability,
    restaurantName,
  } = table;
  return (
    <div className="p-5 bg-[#fff8ee] rounded shadow shadow-red-200">
      <img
        className="rounded shadow-2xl shadow-red-200 h-72 w-full"
        src={photo}
        alt=""
      />
      <div className="flex justify-between mt-2 border-b-2 border-red-400 pb-1">
        <h1 className="text-xl text-[#3E312D] font-[700] font-inter">
          <span className="uppercase">{shape}</span> Table
        </h1>
        <p className="text-xl font-semibold flex">
          <span className="text-lg">from</span>
          <span>{restaurantName}</span>
        </p>
      </div>
      <div>
        <div className="text-xl font-semibold flex justify-between mt-1">
          <h1>
            Size: {length} X {width} feet
          </h1>
          <h4 className="flex items-center justify-end">
            <TbCurrencyTaka size={25}></TbCurrencyTaka>
            <span>{parseFloat(price)}/Hour</span>
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
          Capacity: {capacity}
        </p>
        <p
          className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
        >
          {availability ? "Available" : "Not Available"}
        </p>
      </div>
      <p className="py-2">{description}</p>
      <div className="h-10 flex justify-between items-center mt-2">
        <button className=" flex items-center hover:border hover:border-[#E94339] p-1 rounded-full">
          <BiDetail className="text-[#E94339]" size={20}></BiDetail>
          <p>Restaurant Details</p>
        </button>
        <button className="flex items-center hover:border hover:border-[#E94339] p-1 rounded-full">
          <MdOutlineTableBar className="text-[#E94339]" size={20} />
          <p>Reserve Now</p>
        </button>
      </div>
    </div>
  );
};

export default ReserveTableCard;
