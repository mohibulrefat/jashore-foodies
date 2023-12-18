import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { Circles } from  'react-loader-spinner'
import { AuthContext } from "../../../provider/AuthProvider";
const Additems = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }
  const handleAdd = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const cusinetype = form.cusinetype.value;
    const ing1 = form.ing1.value;
    const ing2 = form.ing2.value;
    const ing3 = form.ing3.value;
    const description = form.description.value;
    const photo = form.photo.value;

    const newItem = {
      name,
      price: parseFloat(price),
      cusinetype,
      ingredients: { ing1, ing2, ing3 },
      description,
      photo,
      date: new Date(),
      availability: false,
      restaurantName: user?.displayName,
      restaurantEmail: user?.email,
      offer: 0.0,
      rating: 0,
      sold: 0,
    };
    axios.post("http://localhost:3000/additem", newItem).then((data) => {
      if (data.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Item added successfully",
          showConfirmButton: false,
          timer: 800,
        });
      }
    });
  };
  return (
    <div className="card flex-shrink-0 md:w-1/2 my-10 shadow-2xl bg-[#FFF8EE] mx-auto">
      <div className="card-body">
        <h1 className="text-3xl text-center font-bold text-red-600">
          Add Item
        </h1>
        <p className="text-red-600 text-center border border-[#E94339] rounded-lg font-semibold"></p>
        <form onSubmit={handleAdd}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ex: Burger"
              className="input input-bordered bg-gray-100 "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price in Taka</span>
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              placeholder="Ex: 60.00"
              className="input input-bordered bg-gray-100 "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cuisine Type</span>
            </label>
            <input
              type="text"
              name="cusinetype"
              placeholder="Ex: Bengali/Chinese"
              className="input input-bordered bg-gray-100"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Three Key Ingredients</span>
            </label>
            <div className="flex gap-1">
              <input
                type="text"
                name="ing1"
                placeholder="Ex: Beef"
                className="input input-bordered bg-gray-100 w-1/3"
                required
              />
              <input
                type="text"
                name="ing2"
                placeholder="Ex: Potato"
                className="input input-bordered bg-gray-100 w-1/3"
                required
              />
              <input
                type="text"
                name="ing3"
                placeholder="Ex: YoYo Sauce"
                className="input input-bordered bg-gray-100 w-1/3"
                required
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              id="description"
              cols="10"
              rows="5"
              className="input-bordered bg-gray-100 border rounded-md p-3"
              placeholder="Write description about this item"
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered bg-gray-100"
              required
            />
          </div>
          <div className="form-control mt-6 w-1/2 mx-auto">
            <input
              type="submit"
              value="Add"
              className="btn bg-[#E94339] text-white hover:border hover:border-[#E94339] hover:text-[#E94339]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Additems;
