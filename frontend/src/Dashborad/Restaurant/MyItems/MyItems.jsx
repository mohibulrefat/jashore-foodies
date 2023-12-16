import { useContext, useEffect, useState } from "react";
import useSectionTitle from "../../../hooks/useSectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/myitems/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [user]);
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
                  <button className="btn bg-gray-600 btn-ghost btn-xs text-white">
                    Update
                  </button>
                  <button className="btn bg-red-500 btn-ghost btn-xs text-white">
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
