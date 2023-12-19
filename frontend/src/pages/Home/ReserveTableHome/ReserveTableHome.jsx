import { useEffect, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import ReserveTableCard from "../../ReserveTable/ReserveTableCard";

const ReserveTableHome = () => {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    fetch("https://jashore-foodies-backend.vercel.app/tablereservation")
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, []);
  return (
    <div>
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto">
        {tables.slice(0, 3).map((table) => (
          <ReserveTableCard key={table._id} table={table}></ReserveTableCard>
        ))}
      </div>
      <div className="flex justify-end w-11/12 mx-auto">
        <Link to="reservetable">
          <button className="bg-red-100 text-[#E94339] my-1 flex items-center gap-1 justify-center px-1 rounded-full btn-sm text-base">
            <span>See more</span> <BsArrowRightCircle></BsArrowRightCircle>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReserveTableHome;
