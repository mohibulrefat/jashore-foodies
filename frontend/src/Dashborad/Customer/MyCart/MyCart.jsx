import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import useSectionTitle from "../../../hooks/useSectionTitle";
import MyCartCard from "./MyCartCard";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const MyCart = () => {
  const [cart] = useCart();
  return (
    <>
      {useSectionTitle("Your Cart", "")}
      <div className="my-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto">
        {cart.map((item) => (
          <MyCartCard key={item._id} item={item}></MyCartCard>
        ))}
      </div>
      <Link to="/dashboard/orderdetails">
        <button className="flex items-center hover:bg-gray-300 hover:text-[#E94339] rounded-full bg-[#e9423945] mb-2 w-32 mx-auto p-2">
          <FaRegArrowAltCircleRight
            className="text-[#E94339] hover:text-red-400"
            size={20}
          />
          <p className="font-semibold ml-1">Order Now</p>
        </button>
      </Link>
    </>
  );
};

export default MyCart;
