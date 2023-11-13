import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { BiDetail } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
const TrendingCard = () => {
  return (
    <div className="p-5 bg-[#fff8ee] rounded shadow shadow-red-20 relative">
      <p className="absolute right-1 top-1 rounded-full text-white py-1 px-2 bg-red-600">
        Trending
      </p>
      <img
        className="rounded shadow-2xl shadow-red-200"
        src="https://i0.wp.com/www.framedrecipes.com/wp-content/uploads/2015/02/Chicken_Fry_1234_01.jpg?fit=1620%2C1080&ssl=1"
        alt=""
      />
      <div className="flex justify-between mt-2 border-b-2 border-red-400">
        <h1 className="text-xl text-[#3E312D] font-[700] font-inter">
          Temp Burgir
        </h1>
        <p className="flex items-center text-xl font-semibold">
          <span>20</span>
          <TbCurrencyTaka></TbCurrencyTaka>
        </p>
      </div>
      <h4 className="text-base text-right mb-2">
        from <span className="font-semibold ">Al Hillal Restaurants</span>
      </h4>
      <div className="flex justify-between my-1">
        <p
          className="bg-[#ADBC76] text-[#3E312D] text-base py-1 font-poppins rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
        >
          Beef
        </p>
        <p
          className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
        >
          Lola Chese
        </p>
        <p
          className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
        >
          Yo Yo Sauce
        </p>
      </div>
      <p className="py-2">
        Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Id, quas?
      </p>
      <div className="h-10 flex justify-between items-center mt-2">
        <Rating style={{ maxWidth: 100 }} value={3.6} readOnly />
        <button className="flex items-center hover:border hover:border-[#E94339] p-1 rounded-full">
          <BsCartCheck className="text-[#E94339]" size={20}></BsCartCheck>
          <p>Cart</p>
        </button>
        <button className=" flex items-center hover:border hover:border-[#E94339] p-1 rounded-full">
          <BiDetail className="text-[#E94339]" size={20}></BiDetail>
          <p>Details</p>
        </button>
      </div>
    </div>
  );
};

export default TrendingCard;
