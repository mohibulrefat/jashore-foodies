import axios from "axios";
import { BiTime } from "react-icons/bi";
import { FaPhone } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import Swal from "sweetalert2";

const VerifyRestaurantCard = ({ restaurant, fetchstate, setFetchstate }) => {
  const {
    _id,
    address,
    category,
    contact,
    email,
    endtime,
    starttime,
    photo,
    restaurantname,
  } = restaurant;
  const convertToAMPM = (time) => {
    const [hours, minutes] = time.split(":");
    let period = "AM";

    if (parseInt(hours, 10) >= 12) {
      period = "PM";
    }

    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const formattedMinutes = parseInt(minutes, 10);

    return `${formattedHours}:${formattedMinutes.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })} ${period}`;
  };
  const message = {
    message:
      "Congratulations on the approval! Your hard work paid off, and I'm thrilled for your well-deserved success. Looking forward to seeing more great things from you.",
  };
  const handleApproval = async (_id) => {
    const result = await axios.post(
      `https://jashore-foodies-backend.vercel.app/approverestaurant/${_id}`,
      message
    );
    console.log(result);
    if (result.data.acknowledged == true) {
      setFetchstate(!fetchstate);
      Swal.fire({
        title: "Approved",
        text: "You have approved the request!",
        icon: "success",
      });
    }
  };
  return (
    <div className="p-5 bg-[#fff8ee] rounded shadow shadow-red-20">
      <img
        className="rounded shadow-2xl mt-1 shadow-red-200 w-full h-56"
        src={photo}
        alt=""
      />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-1 text-[#3E312D] font-[700] font-inter">
          {restaurantname}
        </h1>
        <p className="rounded-full text-black py-1 px-5 ml-4 border-2 border-[#E94339] font-bold">
          {category}
        </p>
      </div>
      <h4 className="mb-2 flex items-center gap-1">
        <FaMapLocationDot
          size={20}
          className="text-[#E94339]"
        ></FaMapLocationDot>
        <span className="font-semibold ">{address}</span>
      </h4>
      <h4 className="mb-2 flex items-center gap-1">
        <BiTime size={20} className="text-[#E94339]"></BiTime>
        <span className="font-semibold ">{convertToAMPM(starttime)}</span>
        <span className="font-semibold ">{convertToAMPM(endtime)}</span>
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
        <button className="mx-auto rounded-full border-solid border-2 hover:bg-[#E94339] border-[#E94339] py-1 px-4 bg-white hover:text-white">
          See Details
        </button>
        <button
          onClick={() => handleApproval(_id)}
          className="mx-auto rounded-full border-solid border-2 hover:bg-[#E94339] border-[#E94339] py-1 px-4 bg-white hover:text-white"
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default VerifyRestaurantCard;
