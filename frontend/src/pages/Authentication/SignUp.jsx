import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../assets/login.svg";
import { AuthContext } from "../../provider/AuthProvider";
import Social from "./Social";
const imgbb_token = import.meta.env.VITE_ImageBB_token;
const SignUp = () => {
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const onSubmit = (data) => {
    if (data.password !== confirmPassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password not matched.",
        showConfirmButton: false,
        timer: 700,
      });
    } else {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      fetch(`https://api.imgbb.com/1/upload?key=${imgbb_token}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          createUser(data.email, data.password)
            .then((result) => {
              updateUserProfile(result.user, data.name, res.data.display_url);
              logOut()
                .then(() => {
                  const saveUser = {
                    name: data.name,
                    email: data.email,
                    photo: res.data.display_url,
                    role: "customer",
                  };
                  fetch("https://jashore-foodies-backend.vercel.app/users", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      // console.log(data)
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
                setErrormsg("Already Registered");
              } else {
                setErrormsg(error.message);
              }
            });
        });
    }
  };
  const handleConfim = (e) => {
    const confirmPassword = e?.target?.value;
    setConfirmPassword(confirmPassword);
  };
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
            <form onSubmit={handleSubmit(onSubmit)}>
              {errormsg.length > 2 && (
                <p className="text-center border border-[#E94339] text-[#E94339] text-sm my-1 font-semibold rounded-md">
                  {errormsg}
                </p>
              )}
              <Social></Social>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  name="name"
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
                  onChange={handleConfim}
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
                  placeholder="Photo"
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

export default SignUp;
