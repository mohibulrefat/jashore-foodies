import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { GiFoodTruck, GiRoundTable, GiTabletopPlayers } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import HashLoader from "react-spinners/ClipLoader";
import Footer from "../Footer/Footer";
import NavBar from "../components/Navbar/NavBar";
import useRestaurantApproval from "../hooks/useRestaurantApproval";
import useUserType from "../hooks/useUserType";
const Dashboard = () => {
  const { isCustomer, isAdmin, isRestaurant, isUserTypeLoading } =
    useUserType();

  const isRestaurantApprovad = useRestaurantApproval();
  if (isUserTypeLoading) {
    return <HashLoader color="#36d7b7" />;
  }
  return (
    <div>
      <NavBar></NavBar>
      <div className="w-11/12 mx-auto lg:flex min-h-screen">
        <div className=" lg:w-1/5 px-10 py-5 flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">DASHBOARD</h1>
          {isAdmin && (
            <div className="space-y-1">
              <NavLink
                to="admin"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <FaHome></FaHome>
                <button>Home</button>
              </NavLink>
              <NavLink
                to="verifyrestaurants"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <GiTabletopPlayers></GiTabletopPlayers>
                <button>Verify restaurant</button>
              </NavLink>
            </div>
          )}
          {isRestaurant && !isRestaurantApprovad && (
            <div>
              <NavLink
                to="authorityfeedback"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <GiTabletopPlayers></GiTabletopPlayers>
                <button>Authority Feedback</button>
              </NavLink>
            </div>
          )}
          {isRestaurant && isRestaurantApprovad && (
            <div className="space-y-1">
              <NavLink
                to="restaurant"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <FaHome></FaHome>
                <button>Home</button>
              </NavLink>
              <NavLink
                to="additem"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <AiOutlineAppstoreAdd></AiOutlineAppstoreAdd>
                <button>Add Items</button>
              </NavLink>
              <NavLink
                to="myitems"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <AiOutlineAppstoreAdd></AiOutlineAppstoreAdd>
                <button>My Items</button>
              </NavLink>
              <NavLink
                to="addtable"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <GiRoundTable></GiRoundTable>
                <button>Add Table</button>
              </NavLink>
              <NavLink
                to="mytables"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <GiRoundTable></GiRoundTable>
                <button>My Tables</button>
              </NavLink>
              <NavLink
                to="orderrequest"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <GiFoodTruck></GiFoodTruck>
                <button>Order Request</button>
              </NavLink>
              <NavLink
                to="reservationrequest"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <GiTabletopPlayers></GiTabletopPlayers>
                <button>Reservation Request</button>
              </NavLink>
              <NavLink
                to="authorityfeedback"
                className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white"
              >
                <GiTabletopPlayers></GiTabletopPlayers>
                <button>Authority Feedback</button>
              </NavLink>
            </div>
          )}
          {isCustomer && (
            <div className="space-y-1">
              <NavLink className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white">
                <FaHome></FaHome>
                <button>Home</button>
              </NavLink>
              <NavLink className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white">
                <AiOutlineAppstoreAdd></AiOutlineAppstoreAdd>
                <button>My Reservation</button>
              </NavLink>
              <NavLink className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white">
                <GiRoundTable></GiRoundTable>
                <button>My Orders</button>
              </NavLink>
              <NavLink className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white">
                <GiFoodTruck></GiFoodTruck>
                <button>Payment History</button>
              </NavLink>
              <NavLink className="border rounded-xl text-left flex items-center gap-1 px-3 py-2 border-[#E94339] hover:bg-[#E94339] text-[#E94339] hover:text-white">
                <GiTabletopPlayers></GiTabletopPlayers>
                <button>Favourites</button>
              </NavLink>
            </div>
          )}
        </div>
        <div className="lg:w-4/5">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
