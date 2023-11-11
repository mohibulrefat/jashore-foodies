import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../provider/AuthProvider";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="bg-[#FFF8EE] py-4">
      <div className="w-full md:w-11/12 mx-auto">
        <div className="flex mx-auto justify-between w-full">
          {/* Primary menu and logo */}
          <div className="flex items-center gap-16">
            {/* logo */}
            <Link href="/" className="flex gap-1 text-gray-800 items-center ">
              <img src={logo} className="h-8 w-8 rounded-full" alt="" />
              <span className="font-agbalumo text-2xl font-semibold">
                JASHORE FOODIES
              </span>
            </Link>
            {/* primary */}
            <div className="hidden lg:flex gap-8 text-lg">
              <NavLink to="/">Home</NavLink>
              <NavLink to="allrestaurants">Restaurants</NavLink>
              <NavLink to="allrestaurantsitems">All Items</NavLink>
              <NavLink to="offers">Offers</NavLink>
              <NavLink to="/dashboard">My Dashboard</NavLink>
              <NavLink to="/additems">add items</NavLink>
              <NavLink to="/restaturantregister">restaturantregister</NavLink>
            </div>
          </div>
          {/* secondary */}
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2">
                <MoonIcon className="h-6 w-6 " />
                <SunIcon className="h-6 w-6" />
                {user && (
                  <img
                    className="w-9 h-9 rounded-full border-2 border-[#E94339]"
                    src={user?.photoURL}
                    alt=""
                  />
                )}
              </div>
              {!user ? (
                <div className="hidden lg:flex gap-2 font-poppins">
                  <Link to="/signin">
                    <button className="w-28 mx-auto rounded-lg border-solid border-2 border-[#E94339] py-1 px-4 hover:bg-[#E94339] hover:text-white text-gray-900">
                      LOGIN
                    </button>
                  </Link>
                  {/* <Link to="/signup">
                    <button className="w-28 mx-auto rounded-lg border-solid border-2 hover:border-[#E94339] hover:bg-white hover:text-gray-900 py-1 px-4 bg-[#E94339] text-white">
                      SIGNUP
                    </button>
                  </Link> */}
                  <div
                    className={`dropdown dropdown-left ${isOpen ? "open" : ""}`}
                  >
                    <button
                      className="w-28 mx-auto rounded-lg border-solid border-2 hover:border-[#E94339] hover:bg-white hover:text-gray-900 py-1 px-4 bg-[#E94339] text-white"
                      onClick={toggleDropdown}
                    >
                      SIGNUP
                    </button>
                    {isOpen && (
                      <ul
                        className="shadow menu dropdown-content z-[1] bg-base-100"
                        onClick={closeDropdown}
                      >
                        <li>
                          <Link to="/signup">
                            <button className="w-28 mx-auto rounded-lg border-solid border-2 hover:border-[#E94339] hover:bg-white hover:text-gray-900 py-1 px-4 bg-[#E94339] text-white">
                              Customer
                            </button>
                          </Link>
                        </li>
                        <li>
                          <Link to="/registerrestaurant">
                            <button className="w-28 mx-auto rounded-lg border-solid border-2 hover:border-[#E94339] hover:bg-white hover:text-gray-900 py-1 px-4 bg-[#E94339] text-white">
                              Restaurant
                            </button>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex gap-2 font-poppins">
                  <button
                    onClick={logOut}
                    className="w-20 mx-auto rounded-lg border-solid border-2 hover:border-[#E94339] hover:bg-white hover:text-gray-900 py-1 px-1 bg-[#E94339] text-white"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center pr-4">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <Bars3Icon className="h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div
        className={`w-52 z-50 absolute overflow-hidden bg-red-100 flex flex-col lg:hidden origin-top duration-700 rounded-br-xl ${
          !toggleMenu ? "h-0" : "h-fit mt-3 py-5"
        }`}
      >
        <div className="px-8">
          <div className="flex flex-col gap-6 text-sm tracking-wider">
            <NavLink to="/">Home</NavLink>
            <NavLink to="allrestaurants">Restaurants</NavLink>
            <NavLink to="allrestaurantsitems">All Items</NavLink>
            <NavLink to="offers">Offers</NavLink>
            <NavLink to="">My Dashboard</NavLink>
            {!user ? (
              <>
                <Link to="/signin">
                  <button className="w-28 mx-auto rounded-lg border-solid border-2 border-[#E94339] py-1 px-4 hover:bg-[#E94339] hover:text-white">
                    LOGIN
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-28 mx-auto rounded-lg border-solid border-2 hover:border-[#E94339] py-1 px-4 bg-[#E94339] text-white">
                    SIGNUP
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button className="w-20 mx-auto rounded-lg border-solid border-2 hover:border-[#E94339] hover:bg-white hover:text-gray-900 py-1 px-1 bg-[#E94339] text-white">
                  LOGOUT
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
