import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-5 m-5 md:w-1/5 rounded-xl shadow-xl border border-[#E94339]">
        {/* {errormsg.length > 2 && (
          <p
            style={{ border: "1px solid red" }}
            className="text-center text-red-500 text-sm my-1 font-semibold rounded-md"
          >
            {errormsg}
          </p>
        )} */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-3 mt-2">
          LOGIN HERE
        </h2>
        <div className="flex justify-around mt-2">
          <button className="p-2 rounded  hover:bg-gray-100 flex items-center gap-2 border border-[#E94339]">
            <FaGoogle className="text-[#E94339]"></FaGoogle>
            <span className="font-semibold text-gray-600">Google</span>
          </button>
          <button className="p-2 rounded hover:bg-gray-100 flex items-center gap-2 border border-[#E94339]">
            <FaFacebook className="text-[#E94339]"></FaFacebook>
            <span className="font-semibold text-gray-600">Facebook</span>
          </button>
        </div>
        <h4 className="text-sm font-bold text-center text-gray-600 my-3">OR</h4>
        <form className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Email address"
            className="bg-gray-100 px-5 py-2 rounded"
          />

          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Your password"
            className="bg-gray-100 px-5 py-2 rounded"
          />

          <input
            type="submit"
            value="Login"
            className="bg-[#E94339] text-white font-semibold rounded"
          />
        </form>
        <h4 className="my-3 text-sm text-gray-500 text-center">
          Not have an account?{" "}
          <Link to="/signup" className="text-[#E94339]">
            SignUp
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
