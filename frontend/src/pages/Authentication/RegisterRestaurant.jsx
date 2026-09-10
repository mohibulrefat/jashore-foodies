import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../assets/restaurant_registration.jpg";
import { uploadImage } from "../../lib/uploadImage";
import { AuthContext } from "../../provider/AuthContext";

const RegisterRestaurant = () => {
  const { register, handleSubmit, reset } = useForm();
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errormsg, setErrormsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setErrormsg("");
    setSubmitting(true);
    try {
      const photo = await uploadImage(data.image?.[0], "restaurants");

      const profile = { ...data };
      delete profile.image;
      await registerUser({
        ...profile,
        name: data.restaurantname,
        photo,
        role: "restaurant",
      });

      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful.",
        showConfirmButton: false,
        timer: 900,
      });
      navigate("/dashboard/restaurant", { replace: true });
    } catch (error) {
      setErrormsg(
        error.response?.data?.message || "Registration failed, please try again"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="hero lg:min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-3/5 hidden md:flex">
          <img src={img} alt="" />
        </div>
        <div className="lg:w-2/5 card flex-shrink-0 w-full shadow-2xl bg-[#FFF8EE]">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold text-red-600">
              Create Account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errormsg && (
                <p className="text-center border border-[#E94339] text-[#E94339] text-sm my-1 font-semibold rounded-md py-1">
                  {errormsg}
                </p>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Restaurant Name</span>
                </label>
                <input
                  type="text"
                  {...register("restaurantname")}
                  required
                  placeholder="Ex: Cafe Mariot"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Restaurant Category</span>
                </label>
                <input
                  type="text"
                  {...register("category")}
                  placeholder="Ex: Chinese"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Ex: 14, Rail Road, Jessore"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Ex: test@gmail.com"
                  className="input input-bordered bg-gray-100"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                  })}
                  placeholder="password"
                  className="input input-bordered bg-gray-100"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact</span>
                </label>
                <input
                  type="text"
                  {...register("contact")}
                  placeholder="+880 1........."
                  className="input input-bordered bg-gray-100"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Schedule</span>
                </label>
                <span className="flex border-2 rounded-xl justify-between bg-gray-100">
                  <input
                    type="time"
                    {...register("starttime")}
                    className="input border-0 bg-gray-100"
                  />
                  <span className="flex items-center">to</span>
                  <input
                    type="time"
                    {...register("endtime")}
                    className="input border-0 bg-gray-100"
                  />
                </span>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-2/3 mx-auto btn bg-white hover:bg-[#E94339] hover:text-white border border-[#E94339] disabled:opacity-60"
                >
                  {submitting ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
            <p className="my-4 text-center">
              Already Have an Account?{" "}
              <Link to="/signin" className="text-red-600 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRestaurant;
