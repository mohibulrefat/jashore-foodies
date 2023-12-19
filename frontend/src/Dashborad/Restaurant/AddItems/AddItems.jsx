import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";
const imgbb_token = import.meta.env.VITE_ImageBB_token;
const Additems = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return;
  }
  const handleAdd = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = form.get("name");
    const price = form.get("price");
    const cusinetype = form.get("cusinetype");
    const ing1 = form.get("ing1");
    const ing2 = form.get("ing2");
    const ing3 = form.get("ing3");
    const description = form.get("description");
    const image = form.get("image");
    const newItem = {
      name,
      price: parseFloat(price),
      cusinetype,
      ingredients: { ing1, ing2, ing3 },
      description,
      date: new Date(),
      availability: false,
      restaurantName: user?.displayName,
      restaurantEmail: user?.email,
      offer: 0.0,
      rating: 0,
      sold: 0,
    };
    const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imgbb_token}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        newItem.photo = data.data.display_url;
        axios
          .post("https://jashore-foodies-backend.vercel.app/additem", newItem)
          .then((data) => {
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
              type="file"
              name="image"
              placeholder="Photo"
              className="input-bordered bg-gray-100 p-2 border rounded"
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
