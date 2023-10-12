import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-5 m-5 md:w-1/5 rounded border border-green-300">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-5">
          Sign Up With
        </h2>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            className="bg-gray-100 px-5 py-2 rounded"
          />
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Your Phone Number"
            className="bg-gray-100 px-5 py-2 rounded"
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Your Address"
            className="bg-gray-100 px-5 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email Address"
            className="bg-gray-100 px-5 py-2 rounded"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            className="bg-gray-100 px-5 py-2 rounded"
          />

          <input
            type="file"
            name="photo"
            id="photo"
            className="bg-gray-100 px-5 py-2 rounded"
          />

          <input
            type="submit"
            value="Sign Up"
            className="bg-green-500 text-white font-semibold rounded"
          />
        </form>
        <h4 className="my-3 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600">
            Log in
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SignUp;
