import { useContext, useEffect, useState } from "react";
import useSectionTitle from "../../../hooks/useSectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";

const MyTables = () => {
  const { user } = useContext(AuthContext);
  const [tables, setTables] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/mytables/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, [user]);
  return (
    <div className="px-5 border-l-2 ml-5 mt-2">
      {useSectionTitle("Your Tables", "All the tables you are selling")}
      <div className="overflow-x-auto mt-2">
        <table className="table text-center">
          {/* head */}
          <thead className="bg-[#E94339]">
            <tr className="text-white">
              <th>#</th>
              <th>Image</th>
              <th>Size (Sq feet)</th>
              <th>Shape</th>
              <th>Capacity (Person)</th>
              <th>Price/Hour</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {tables.map((table, index) => (
              <tr key={table._id}>
                <th>{index + 1}</th>
                <td className="">
                  <img className="w-9 mx-auto" src={table.photo} alt="" />
                </td>
                <td>
                  {table.length} X {table.width}
                </td>
                <td className="uppercase">{table.shape}</td>
                <td>{table.capacity}</td>
                <td>{table.price}</td>
                <td>{table.availability ? "Available" : "Not Available"}</td>
                <td className="flex gap-1 justify-center tables-center">
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

export default MyTables;
