import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errormsg, setErrormsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setErrormsg("");
    setSubmitting(true);
    try {
      await signIn(data.email, data.password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful.",
        showConfirmButton: false,
        timer: 800,
      });
      navigate(from, { replace: true });
    } catch (error) {
      setErrormsg(
        error.response?.data?.message || "Login failed, please try again"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-5 m-5 md:w-1/3 lg:w-1/4 rounded-xl shadow-xl border border-[#E94339]">
        {errormsg && (
          <p className="text-center text-red-500 text-sm my-1 font-semibold rounded-md border border-red-400 py-1">
            {errormsg}
          </p>
        )}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-3 mt-2">
          LOGIN HERE
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            id="email"
            {...register("email")}
            required
            placeholder="Email address"
            className="bg-gray-100 px-5 py-2 rounded"
          />
          <input
            type="password"
            id="password"
            {...register("password")}
            required
            placeholder="Your password"
            className="bg-gray-100 px-5 py-2 rounded"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#E94339] text-white font-semibold rounded py-2 disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
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

export default SignIn;
