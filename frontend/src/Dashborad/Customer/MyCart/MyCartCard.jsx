import { Rating } from "@smastrom/react-rating";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";

const MyCartCard = ({ item }) => {
  const [, refetch] = useCart();
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
  } = item.item;
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jashore-foodies-backend.vercel.app/carts/${item._id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  return (
    <div
      className={`flex flex-col justify-between p-2 bg-[#fff8ee] rounded shadow shadow-red-200 relative`}
    >
      {offer > 0 && (
        <p className="absolute right-1 top-1 rounded-full text-white py-1 px-2 bg-red-600">
          {offer}% Off
        </p>
      )}
      <div>
        <img
          className="rounded shadow-2xl shadow-red-200 w-full h-48"
          src={photo}
          alt=""
        />
        <div className="flex justify-between mt-2 border-b-2 border-red-400">
          <h1 className="text-lg text-[#3E312D] font-[700] font-inter">
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
          className=" flex items-center hover:border hover:border-[#E94339] p-1 rounded-full bg-[#e9423945]"
          onClick={() => handleDelete()}
        >
          <MdOutlineRemoveShoppingCart className="text-[#E94339]" size={20} />
          <p>Remove</p>
        </button>
      </div>
    </div>
  );
};

export default MyCartCard;
