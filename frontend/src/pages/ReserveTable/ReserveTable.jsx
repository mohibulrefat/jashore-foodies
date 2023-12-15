import { useEffect, useState } from "react";
import ReserveTableCard from "./ReserveTableCard";

const ReserveTable = () => {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/tablereservation")
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, []);
  return (
    <div>
      <div className="mt-16 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto">
        {tables.map((table) => (
          <ReserveTableCard key={table._id} table={table}></ReserveTableCard>
        ))}
      </div>
    </div>
  );
};

export default ReserveTable;
