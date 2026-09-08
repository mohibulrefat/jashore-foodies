import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";

const ChangePassword = () => {
  const { changePassword } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [errormsg, setErrormsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setErrormsg("");
    setSubmitting(true);
    try {
      await changePassword(data.currentPassword, data.newPassword);
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Password updated.",
        showConfirmButton: false,
        timer: 900,
      });
    } catch (error) {
      setErrormsg(
        error.response?.data?.message || "Could not change password"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 card bg-[#FFF8EE] shadow-xl">
      <div className="card-body">
        <h1 className="text-2xl font-bold text-red-600 text-center">
          Change Password
        </h1>
        <form
          className="flex flex-col gap-3 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errormsg && (
            <p className="text-center border border-[#E94339] text-[#E94339] text-sm font-semibold rounded-md py-1">
              {errormsg}
            </p>
          )}
          <input
            type="password"
            required
            placeholder="Current password"
            className="input input-bordered bg-gray-100"
            {...register("currentPassword")}
          />
          <input
            type="password"
            required
            placeholder="New password"
            className="input input-bordered bg-gray-100"
            {...register("newPassword", { minLength: 6 })}
          />
          {errors.newPassword?.type === "minLength" && (
            <p className="text-red-600 text-sm">
              New password must be at least six characters
            </p>
          )}
          <input
            type="password"
            required
            placeholder="Confirm new password"
            className="input input-bordered bg-gray-100"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="btn bg-[#E94339] border-none text-white disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
