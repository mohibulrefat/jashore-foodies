const Additems = () => {
    return (
      <div className="card flex-shrink-0 md:w-1/2 my-10 shadow-2xl bg-[#FFF8EE] mx-auto">
        <div className="card-body">
          <h1 className="text-3xl text-center font-bold text-red-600">Add Item</h1>
          <p className='text-red-600 text-center border border-[#E94339] rounded-lg font-semibold'></p>
          <form >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Item Name</span>
              </label>
              <input type="text" name='name' placeholder="ex: Burger" className="input input-bordered bg-gray-100 " />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input type="text" name='name' placeholder="ex: 60 tk" className="input input-bordered bg-gray-100 " />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category ID</span>
              </label>
              <input type="text" name='categoryid' placeholder="ex: 12h.." className="input input-bordered bg-gray-100" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ingredients</span>
              </label>
              <input type="text"
                name='password' placeholder="ex: Beef, Lala cheese, Yo yo sauce" className="input input-bordered bg-gray-100" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Item Photo</span>
              </label>
              <input type="text"
                name='photo' placeholder="photo url" className="input input-bordered bg-gray-100" required />
            </div>
            <div className="form-control mt-6 w-1/2 mx-auto">
              <input type="submit" value="Add" className="btn bg-[#E94339] border-none" />
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Additems;