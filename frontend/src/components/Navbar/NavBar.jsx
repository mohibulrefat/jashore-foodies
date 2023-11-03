import { BsCart3 } from "react-icons/bs"
import { MdOutlineDarkMode } from "react-icons/md"


const NavBar = () => {
  return (
    <div className="navbar bg-[#FFF8EE] font-[Roboto] text-slate-600  font-bold">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 w-52 text-sm">
            <li><a>HOME</a></li>
            <li> <a>RESTAURANTS</a> </li>
            <li><a>FOOD ITEMS</a></li>
            <li><a>MY DASHBOARD</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-2xl">Jashore Foodies</a>
      </div>
      <div className="navbar-center hidden lg:flex text-sm">
        <ul className="menu menu-horizontal px-1">
          <li><a>HOME</a></li>
          <li> <a>RESTAURANTS</a> </li>
          <li><a>FOOD ITEMS</a></li>
          <li><a>MY DASHBOARD</a></li>
        </ul>
      </div>
      <div className="navbar-end text-sm">
        <ul className="menu menu-horizontal px-1">
          <li><div className=' border bg-[#2A435D] p-[8px_10px] text-[20px]  rounded-[300px] mr-2'>
              <span className='text-white'><BsCart3></BsCart3></span>
            </div></li>
          <li tabIndex={0}>
            <details>
              <summary className="p-0 border-2 border-[#E94339]"><a className="py-2 px-3 rounded-sm " >LOGIN</a></summary>
              <ul className="p-2">
                <li><a>Customer</a></li>
                <li><a>Restaurant</a></li>
                <li><a>Delivery Man</a></li>
              </ul>
            </details>
          </li>
         <li><div className=' border bg-[#2A435D] p-[8px_10px] rounded-[300px] ml-2 text-[20px]'>
              <span className='text-white'><MdOutlineDarkMode></MdOutlineDarkMode></span>
            </div></li>
        </ul>
      </div>
    </div>

  )
}

export default NavBar