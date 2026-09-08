import { useEffect, useState } from "react";
import useSectionTitle from "../../hooks/useSectionTitle";
import ReserveTableCard from "./ReserveTableCard";
import api from "../../lib/api";

const ReserveTable = () => {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    api.get("/tablereservation").then(({ data }) => setTables(data));
  }, []);
  return (
    <div>
      {useSectionTitle(
        "Table Reservations",
        "Book your table now and enjoy a delightful dining experience."
      )}
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto">
        {tables.map((table) => (
          <ReserveTableCard key={table._id} table={table}></ReserveTableCard>
        ))}
      </div>
    </div>
  );
};

export default ReserveTable;
