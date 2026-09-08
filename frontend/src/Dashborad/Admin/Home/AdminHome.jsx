import { useEffect, useState } from "react";
import api from "../../../lib/api";

const AdminHome = () => {
  const [info, setInfo] = useState({ newreq: 0 });
  useEffect(() => {
    api
      .get("/admin/adminhomeinfo")
      .then(({ data }) => setInfo(data))
      .catch(() => {});
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mt-10">
        <div className="h-44 w-40 bg-[#FFE2E5] flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{info.newreq}</span>
          New Request
        </div>
        <div className="h-44 w-40 bg-[#DCFCE7] flex items-center justify-center">
          Re-consideration
        </div>
        <div className="h-44 w-40 bg-[#F3E8FF] flex items-center justify-center">
          Customer Report
        </div>
        <div className="h-44 w-40 bg-[#FFF4DE] flex items-center justify-center">
          Total Orders
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
