import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
            <div className="hidden lg:flex gap-8">
              <a href="#">HOME</a>
              <a href="#">RESTAURANTS</a>
              <a href="#">FOOD ITEMS</a>
              <a href="#">MY DASHBOARD</a>
            </div>
          </div>
          {/* secondary */}
          <div className="flex gap-6 items-center">
            <div className="flex gap-5 items-center">
              <div className="flex items-center gap-2">
                <MoonIcon className="h-6 w-6 " />
                <SunIcon className="h-6 w-6" />
              </div>
              <div className="hidden lg:block">
                <button className="rounded-lg border-solid border-2 border-[#E94339] py-1 px-4 hover:bg-[#E94339] hover:text-white">
                  LOGIN
                </button>
              </div>
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
        className={`w-52 z-50 absolute overflow-hidden bg-red-100 flex flex-col lg:hidden gap-12  origin-top duration-700 rounded-br-xl ${
          !toggleMenu ? "h-0" : "h-2/3"
        }`}
      >
        <div className="px-8">
          <div className="flex flex-col gap-8 text-sm tracking-wider">
            <a href="#">HOME</a>
            <a href="#">RESTAURANTS</a>
            <a href="#">FOOD ITEMS</a>
            <a href="#">MY DASHBOARD</a>
            <button className="rounded-lg border-solid border-2 border-[#E94339] py-1 px-4 hover:bg-[#E94339] hover:text-white">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
