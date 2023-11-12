const AddItem = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-extrabold text-center">Add Food Item</h1>
      <form className="m-6 bg-slate-100 rounded-xl shadow-lg  p-8  border border-[#E94339]">
        {/* form-row-name-and-quantity */}
        <div className="md:flex ">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="name"
                placeholder="food name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="photo"
                placeholder="image"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* form-row supplier */}
        <div className="md:flex ">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Restaurant Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="restaurant"
                placeholder="Enter restaurant name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="type"
                placeholder="category"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="md:flex ">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="price"
                placeholder="price"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="description"
                placeholder="description"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* form-row */}
        <div className="mb-8 ">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="rating"
                placeholder="rating"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        <input
          type="submit"
          value="Add Item"
          className="btn bg-red-500 text-white font-semibold rounded w-full"
          id=""
        />
      </form>
    </div>
  );
};

export default AddItem;
