import { Rating } from "@smastrom/react-rating";
import { BiTime } from "react-icons/bi";
import { FaPhone } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
const RestaurantsCard = ({ restu }) => {
  const {
    // restaurantId,
    name,
    // liscenceNo,
    address,
    schedule,
    category,
    image,
    contact,
    email,
  } = restu;

  return (
    <div className="p-5 bg-[#fff8ee] rounded shadow shadow-red-20">
      <p className="rounded-full text-black py-1 px-5 ml-4 border-2 border-[#E94339] font-bold">
        {category}
      </p>
      <img
        className="rounded shadow-2xl mt-1 shadow-red-200 w-full max-h-56"
        src={image}
        alt=""
      />
      <h1 className="text-2xl my-1 text-[#3E312D] font-[700] font-inter mx-auto">
        {name}
      </h1>
      <h4 className="mb-2 flex items-center gap-1">
        <FaMapLocationDot
          size={20}
          className="text-[#E94339]"
        ></FaMapLocationDot>
        <span className="font-semibold ">{address}</span>
      </h4>
      <h4 className="mb-2 flex items-center gap-1">
        <BiTime size={20} className="text-[#E94339]"></BiTime>
        <span className="font-semibold ">{schedule}</span>
      </h4>
      <h4 className="mb-2 flex items-center gap-1">
        <FaPhone size={20} className="text-[#E94339]"></FaPhone>{" "}
        <span className="font-semibold ">{contact}</span>
      </h4>
      <h4 className="flex items-center gap-1 mb-2">
        <TfiEmail size={20} className="text-[#E94339]"></TfiEmail>
        <span className="font-semibold ">{email}</span>
      </h4>
      <div className="flex justify-between">
        <Rating style={{ maxWidth: 100 }} value={3.6} readOnly />
        <button className="mx-auto rounded-full border-solid border-2 hover:bg-[#E94339] border-[#E94339] py-1 px-4 bg-white hover:text-white">
          See Details
        </button>
        <button className="mx-auto rounded-full border-solid border-2 hover:bg-[#E94339] border-[#E94339] py-1 px-4 bg-white hover:text-white">
          View Items
        </button>
      </div>
    </div>
  );
};

export default RestaurantsCard;
