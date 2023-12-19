import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../assets/restaurant_registration.jpg";
import { AuthContext } from "../../provider/AuthProvider";
const imgbb_token = import.meta.env.VITE_ImageBB_token;
const RegisterRestaurant = () => {
  const { register, handleSubmit, reset } = useForm();
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    data.status = "pending";
    data.role = "restaurant";
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(`https://api.imgbb.com/1/upload?key=${imgbb_token}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        const photoUrl = res.data.display_url;
        delete data.image;
        data.photo = photoUrl;
        createUser(data.email, data.password)
          .then((result) => {
            updateUserProfile(result.user, data.restaurantname, data.photo);
            delete data.password;
            logOut()
              .then(() => {
                fetch("http://localhost:3000/restaurants", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.insertedId) {
                      reset();
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Signup Successful.",
                        showConfirmButton: false,
                        timer: 700,
                      });
                      navigate("/signin");
                    }
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            if (error.message.includes("email-already-in-use")) {
              console.log("Already Registered");
            } else {
              console.log(error.message);
            }
          });
      });
  };
  return (
    <div className="hero lg:min-h-screen ">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-3/5 hidden md:flex">
          <img src={img} alt="" />
        </div>
        <div className="lg:w-2/5 card flex-shrink-0 w-full shadow-2xl bg-[#FFF8EE]">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold text-red-600">
              Create Account
            </h1>
            <p className="text-red-600 text-center border border-[#E94339] rounded-lg font-semibold"></p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Restaurant Name</span>
                </label>
                <input
                  type="text"
                  name="restaurantname"
                  {...register("restaurantname")}
                  placeholder="Ex: Cafe Mariot"
                  className="input input-bordered bg-gray-100 "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  name="image"
                  {...register("image")}
                  placeholder="Ex: Cafe Mariot"
                  className="input input-bordered bg-gray-100 "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Restaurant Category</span>
                </label>
                <input
                  type="text"
                  name="category"
                  {...register("category")}
                  placeholder="Ex: Chinese"
                  className="input input-bordered bg-gray-100 "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  {...register("address")}
                  placeholder="Ex: 14, Rail Road, Jessore"
                  className="input input-bordered bg-gray-100 "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
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
                  type="text"
                  name="password"
                  {...register("password")}
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
                  name="contact"
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
                    name="starttime"
                    {...register("starttime")}
                    className="input border-0 bg-gray-100"
                  />
                  <span className="flex items-center">to</span>
                  <input
                    type="time"
                    name="endtime"
                    {...register("endtime")}
                    className="input border-0 bg-gray-100"
                  />
                </span>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Create"
                  className="w-2/3 mx-auto btn bg-white hover:bg-[#E94339] hover:text-white border border-[#E94339]"
                />
              </div>
            </form>
            <p className=" my-4 text-center">
              Already Have an Account?{" "}
              <Link to="/login" className="text-red-600 font-bold">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRestaurant;
