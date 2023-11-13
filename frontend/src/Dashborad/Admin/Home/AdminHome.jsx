const AdminHome = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mt-10">
        <div className="h-44 w-40 bg-[#FFE2E5] flex items-center justify-center">
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
