import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useContext } from "react";
import { BiDetail } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../provider/AuthProvider";
const BigOfferCard = ({ item }) => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    name,
    price,
    ingredients,
    description,
    photo,
    availability,
    restaurantName,
    offer,
    rating,
  } = item;
  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        item,
        customerEmail: user.email,
      };
      console.log(cartItem);
      fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item added on the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div
      className={`flex flex-col justify-between p-5 bg-[#fff8ee] rounded shadow shadow-red-200 relative dark:bg-gray-950 dark:text-white dark:shadow-none dark:border dark:border-gray-600`}
    >
      {offer > 0 && (
        <p className="absolute right-1 top-1 rounded-full text-white py-1 px-2 bg-red-600">
          {offer}% Off
        </p>
      )}
      <div>
        <img
          className="rounded shadow-2xl shadow-red-200 w-full h-48 dark:shadow-sm"
          src={photo}
          alt=""
        />
        <div className="flex justify-between mt-2 border-b-2 border-red-400">
          <h1 className="text-lg text-[#3E312D] font-[700] font-inter dark:text-white">
            {name}
          </h1>
          <div className="flex justify-between items-center text-xl font-semibold">
            <p className={offer > 0 ? "line-through text-gray-400" : ""}>
              {price.toFixed(2)}
            </p>
            {offer > 0 && <p>{price - ((price * offer) / 100.0).toFixed(2)}</p>}
            <TbCurrencyTaka></TbCurrencyTaka>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1>{availability ? "Available" : "Not Available"}</h1>
          <h4 className="text-base text-right mb-2">
            from <span className="font-semibold ">{restaurantName}</span>
          </h4>
        </div>

        <div className="flex justify-between my-1">
          <p
            className="bg-[#ADBC76] text-[#3E312D] text-base py-1 font-poppins rounded-2xl min-w-[70px] text-center"
            style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
          >
            {ingredients.ing1}
          </p>
          <p
            className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
            style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
          >
            {ingredients.ing2}
          </p>
          <p
            className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
            style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
          >
            {ingredients.ing3}
          </p>
        </div>
        <p className="py-2">{description}</p>
      </div>
      <div className="h-10 flex justify-between items-center mt-2">
        <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
        <button
          className="flex items-center hover:border hover:border-[#E94339] p-1 rounded-full"
          disabled={!availability}
          onClick={() => handleAddToCart()}
        >
          <BsCartCheck
            className={`text-${availability ? "[#E94339]" : "gray-500"}`}
            size={20}
          ></BsCartCheck>
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

export default BigOfferCard;
