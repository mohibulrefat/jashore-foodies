import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useCart from "../../../hooks/useCart";
import useSectionTitle from "../../../hooks/useSectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import MyCartCard from "./MyCartCard";
const MyCart = () => {
  const { user, loading } = useContext(AuthContext);
  const [cart] = useCart();
  const [customer, setCustomer] = useState(null);
  //   const [agreed, setAgreed] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const customerResponse = await fetch(
          `http://localhost:3000/customerdetails/${user?.email}`
        );
        const customerData = await customerResponse.json();
        setCustomer(customerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);
  const totalPrice = cart.reduce((accumulator, order) => {
    const itemPrice =
      order.item.price.toFixed(2) -
        ((order.item.price * order.item.offer) / 100).toFixed(2) || 0;
    return accumulator + itemPrice;
  }, 0);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.items = cart;
    data.customer = customer;
    data.totalPrice = totalPrice;
    console.log(data);
    fetch("http://localhost:3000/foodpayment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => window.location.replace(result.url));
  };
  return (
    <>
      {useSectionTitle("Your Cart", "")}
      <div className="w-11/12 mx-auto md:flex gap-2">
        <div className="my-5 grid gap-5 grid-cols-1 md:grid-cols-2 w-2/3">
          {cart.map((item) => (
            <MyCartCard key={item._id} item={item}></MyCartCard>
          ))}
        </div>
        <div className="w-1/3">
          <h1>You are going to pay TK {totalPrice}</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 border p-3 rounded-lg"
          >
            <input
              placeholder="Your Name"
              {...register("name", { required: true })}
              className="input input-bordered input-sm w-full max-w-md"
              defaultValue={customer?.name}
            />
            <select
              {...register("currency")}
              className="input input-bordered input-sm w-full max-w-md"
            >
              <option value="BDT">BDT</option>
              <option value="USD">USD</option>
              <option value="RMB">RMB</option>
              <option value="Euro">Euro</option>
            </select>
            <input
              placeholder="Post Code"
              {...register("postcode", { required: true })}
              className="input input-bordered input-sm w-full max-w-md"
            />
            <input
              placeholder="Address"
              {...register("address", { required: true })}
              className="input input-bordered input-sm w-full max-w-md"
            />
            <input
              placeholder="Phone No"
              {...register("phone", { required: true })}
              className="input input-bordered input-sm w-full max-w-md"
            />
            <textarea
              placeholder="Special Instructions"
              cols="10"
              rows="10"
              {...register("instruction", { required: true })}
              className="input input-bordered w-full max-w-md"
            ></textarea>
            <input
              type="submit"
              value="PAY"
              className="btn btn-outline btn-error text-white input input-bordered input-sm w-full max-w-md"
            />
          </form>
        </div>
      </div>

      {/* <Link to="/dashboard/orderdetails">
        <button className="flex items-center hover:bg-gray-300 hover:text-[#E94339] rounded-full bg-[#e9423945] mb-2 w-32 mx-auto p-2">
          <FaRegArrowAltCircleRight
            className="text-[#E94339] hover:text-red-400"
            size={20}
          />
          <p className="font-semibold ml-1">Order Now</p>
        </button>
      </Link> */}
    </>
  );
};

export default MyCart;
