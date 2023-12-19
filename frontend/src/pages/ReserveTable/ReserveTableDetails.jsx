import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbCurrencyTaka } from "react-icons/tb";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
const ReserveTableDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const { tableId } = useParams();
  const [table, setTable] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [agreed, setAgreed] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loading) {
          return;
        }
        const tableResponse = await fetch(
          `https://jashore-foodies-backend.vercel.app/tabledetails/${tableId}`
        );
        const tableData = await tableResponse.json();
        setTable(tableData);

        const customerResponse = await fetch(
          `https://jashore-foodies-backend.vercel.app/customerdetails/${user?.email}`
        );
        const customerData = await customerResponse.json();
        setCustomer(customerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tableId, user, loading]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (user) {
      data.table = table;
      data.customer = customer;
      fetch("https://jashore-foodies-backend.vercel.app/reservepayment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => window.location.replace(result.url));
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
    <div className="grid grid-cols-1 lg:grid-cols-3 my-16 gap-5 w-11/12 mx-auto">
      <div>
        <div className="p-5 bg-[#fff8ee] rounded shadow shadow-red-200">
          <img
            className="rounded shadow-2xl shadow-red-200 h-72 w-full"
            src={table?.photo}
            alt=""
          />
          <div className="flex justify-between mt-2 border-b-2 border-red-400 pb-1">
            <h1 className="text-xl text-[#3E312D] font-[700] font-inter">
              <span className="uppercase">{table?.shape}</span> Table
            </h1>
            <p className="text-xl font-semibold flex">
              <span className="text-lg">from</span>
              <span>{table?.restaurantName}</span>
            </p>
          </div>
          <div>
            <div className="text-xl font-semibold flex justify-between mt-1">
              <h1>
                Size: {table?.length} X {table?.width} feet
              </h1>
              <h4 className="flex items-center justify-end">
                <TbCurrencyTaka size={25}></TbCurrencyTaka>
                <span>{parseFloat(table?.price).toFixed(2)}/Hour</span>
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
              Capacity: {table?.capacity}
            </p>
            <p
              className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
              style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
            >
              {table?.availability ? "Available" : "Not Available"}
            </p>
          </div>
          <p className="py-2">{table?.description}</p>
        </div>
      </div>
      <div className="p-8 bg-gray-100 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Reservation Terms and Conditions
        </h2>
        <p className="text-gray-700 mb-4">
          By making a reservation, you agree to the following terms and
          conditions:
        </p>

        <ol className="list-decimal ml-6 mb-4">
          <li className="mb-2">
            <span className="font-semibold">Prepayment:</span> A prepayment of
            50% of the table cost per hour is required to secure your
            reservation. This payment is non-refundable.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Arrival Time:</span> You must arrive
            at the restaurant within 30 minutes of making the prepayment.
            Failure to do so may result in the cancellation of your reservation.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Cancellation:</span> Once the
            prepayment is made, the reservation cannot be canceled, and the
            amount paid is non-refundable.
          </li>
        </ol>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agreementCheckbox"
            className="mr-2 text-red-600"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agreementCheckbox" className="text-gray-700">
            I have read and agree to the terms and conditions
          </label>
        </div>
      </div>
      <div>
        <h1>
          You are going to pay TK {parseFloat(table?.price) * (0.5).toFixed(2)}
        </h1>
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

          <input
            disabled={!agreed}
            type="submit"
            value="PAY"
            className="btn btn-outline btn-error text-white input input-bordered input-sm w-full max-w-md"
          />
        </form>
      </div>
    </div>
  );
};
export default ReserveTableDetails;
