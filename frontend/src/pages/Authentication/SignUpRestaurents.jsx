import { Link } from "react-router-dom"

const SignUpRestaurents = () => {
  return (
    <div className="flex justify-center items-center">
    <div className="p-5 m-5 bg-red-100 rounded shadow-xl border border-[#E94339]">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-5">
        Sign Up With
      </h2>
      <form className="m-6 bg-slate-100 rounded-xl shadow-lg  p-8  border border-[#E94339]" >
   
        <div className="md:flex ">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text"> Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                name="phone"
                placeholder="Enter your phone number"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
      
        <div className="md:flex ">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <label className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <label className="input-group">
              <input
                type="password"
                name="password"
                placeholder="*********"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
     
        
        <div className="mb-8 ">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <label className="input-group">
              <input
                type="file"
                name="photo"
                placeholder="Enter your photo URL"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        <input
          type="submit"
          value="Sign Up"
          className="btn bg-red-500 text-white font-semibold rounded w-full"
          id=""
        />
      </form>
      <h4 className="my-3 text-sm text-gray-500 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-[#E94339]">
          Log in
        </Link>
      </h4>
    </div>
  </div>
  )
}

export default SignUpRestaurents