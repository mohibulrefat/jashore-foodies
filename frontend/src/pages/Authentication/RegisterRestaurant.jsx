import { Link } from "react-router-dom";
import img from "../../assets/restaurant_registration.jpg";

const RegisterRestaurant = () => {
  return (
    <div className="hero lg:min-h-screen ">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 hidden md:flex">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-[#FFF8EE]">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold text-red-600">
              Create Account
            </h1>
            <p className="text-red-600 text-center border border-[#E94339] rounded-lg font-semibold"></p>
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Restaurant Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="ex: Cafe Mariot"
                  className="input input-bordered bg-gray-100 "
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="ex: 14, Rail Road, Jessore"
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
                  placeholder="ex: test@gmail.com"
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
                  name="password"
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
                    name="startTime"
                    className="input border-0 bg-gray-100"
                  />
                  <span className="flex items-center">to</span>
                  <input
                    type="time"
                    name="endTime"
                    className="input border-0 bg-gray-100"
                  />
                </span>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Create"
                  className="btn bg-[#E94339] border-none"
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
