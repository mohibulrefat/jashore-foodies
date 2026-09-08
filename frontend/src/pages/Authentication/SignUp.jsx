import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../assets/login.svg";
import { AuthContext } from "../../provider/AuthContext";

const imgbb_token = import.meta.env.VITE_ImageBB_token;

const SignUp = () => {
  const { register: registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setErrormsg("");
    if (data.password !== confirmPassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password not matched.",
        showConfirmButton: false,
        timer: 900,
      });
      return;
    }
    setSubmitting(true);
    try {
      let photo = "";
      if (data.image?.[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbb_token}`,
          { method: "POST", body: formData }
        );
        const uploaded = await res.json();
        photo = uploaded?.data?.display_url || "";
      }

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        photo,
        role: "customer",
      });

      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signup Successful.",
        showConfirmButton: false,
        timer: 900,
      });
      navigate("/", { replace: true });
    } catch (error) {
      setErrormsg(
        error.response?.data?.message || "Registration failed, please try again"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img className="bg-none border-none hidden md:flex" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-[#FFF8EE]">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold text-red-600">
              Register Here
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errormsg && (
                <p className="text-center border border-[#E94339] text-[#E94339] text-sm my-1 font-semibold rounded-md py-1">
                  {errormsg}
                </p>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  required
                  placeholder="ex: Mohibul Refat"
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
                  {...register("email")}
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
                  {...register("password", {
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                  })}
                  placeholder="Your password"
                  className="input input-bordered bg-gray-100"
                />
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password must be more than six characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase and one special character.
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Confirm Password"
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
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn bg-[#E94339] border-none text-white disabled:opacity-60"
                >
                  {submitting ? "Creating..." : "Sign Up"}
                </button>
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

export default SignUp;
