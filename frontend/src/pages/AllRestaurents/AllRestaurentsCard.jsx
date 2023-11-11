import { GrLocation } from "react-icons/gr";

const AllRestaurentsCard = ({ restu }) => {
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
    <div className="p-5 bg-[#fff8ee] rounded shadow shadow-red-20 relative">
      <p className="absolute left-1 top-1 rounded-full text-black py-1 px-5 mt-2 ml-4 border-2 border-[#E94339] font-bold">
        {category}
      </p>
      <img
        className="rounded shadow-2xl shadow-red-200 mt-10 min-w-full max-h-56"
        src={image}
        alt=""
      />
      <div className="flex justify-between mt-2 ">
        <h1 className="text-xl text-[#3E312D] font-[700] font-inter mx-auto">
          {name}
        </h1>
      </div>
      <h4 className="text-base mb-2 flex">
        <GrLocation className="mr-2 text-[#E94339]" size={40}></GrLocation>
        <span className="font-semibold ">{address}</span>
      </h4>
      <h4 className="text-base mb-2">
        Schedule: <span className="font-semibold ">{schedule}</span>
      </h4>
      <h4 className="text-base text-center mb-2">
        Contact: <span className="font-semibold ">{contact}</span>
      </h4>
      <h4 className="text-base text-center mb-2">
        Email: <span className="font-semibold ">{email}</span>
      </h4>
      <p className="text-center">
        <button className="w-28 mx-auto rounded-full border-solid border-2 hover:border-[#E94339] py-1 px-4 bg-[#E94339] text-white">
          View More
        </button>
      </p>
    </div>
  );
};

export default AllRestaurentsCard;
