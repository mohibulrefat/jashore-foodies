import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useSectionTitle from "../../../hooks/useSectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [fetchstate, setfetchState] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/myitems/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [user, fetchstate]);
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/deleteitem/${id}`
        );
        if (response.status === 200) {
          setfetchState(!fetchstate);
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete the item.", "error");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire(
          "Error!",
          "An error occurred while deleting the item.",
          "error"
        );
      }
    }
  };
  const handleAvailable = async (id) => {
    const response = await axios.patch(
      `http://localhost:3000/updateitemavailable/${id}`
    );
    if(response.data.acknowledged){
      setfetchState(!fetchstate)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Successful.',
        showConfirmButton: false,
        timer: 700
    });
    }
  };
  return (
    <div className="px-5 border-l-2 ml-5 mt-2">
      {useSectionTitle("Your Items", "All the items you are selling")}
      <div className="overflow-x-auto mt-2">
        <table className="table text-center">
          {/* head */}
          <thead className="bg-[#E94339]">
            <tr className="text-white">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Offer %</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {items.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td className="">
                  <img className="w-9 mx-auto" src={item.photo} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.availability ? "Available" : "Not Available"}</td>
                <td>{item.offer}</td>
                <td className="flex gap-1 justify-center items-center">
                  <input
                    onClick={() => handleAvailable(item._id)}
                    type="checkbox"
                    className="toggle toggle-success"
                    defaultChecked={item.availability}
                  />
                  <Link to={`/dashboard/updateitem/${item._id}`}>
                    <button className="btn bg-gray-600 btn-ghost btn-xs text-white">
                      Update
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn bg-red-500 btn-ghost btn-xs text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyItems;
