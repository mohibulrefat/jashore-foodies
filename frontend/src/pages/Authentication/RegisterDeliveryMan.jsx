import { Link } from "react-router-dom";
import img from "../../assets/deliveryman.jpg";
import Social from "./Social";
const RegisterDeliveryMan = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className=" w-1/2 mr-12">
          <img
            className="bg-none border-none hidden md:flex"
            src={img}
            alt=""
          />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-[#FFF8EE]">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold text-red-600">
              Register Here
            </h1>
            <p className="text-red-600 text-center border border-[#E94339] rounded-lg font-semibold"></p>
            <form>
              <Social></Social>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="ex: Mohibul Refat"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="ex: Ambottola, Jessore"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact</span>
                </label>
                <input
                  type="number"
                  name="contact"
                  placeholder="ex: +880 1........."
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">NID Number</span>
                </label>
                <input
                  type="number"
                  name="nid"
                  placeholder="ex: 78905667...."
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="ex: mirza@mohibul.com"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="Your password"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered bg-gray-100"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-[#E94339] border-none"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <h4 className="my-3 text-sm text-gray-500 font-semibold text-center">
              Already registered?{" "}
              <Link to="/signin" className="text-[#E94339]">
                Log in
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDeliveryMan;
