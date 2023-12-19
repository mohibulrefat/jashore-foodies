import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../components/Navbar/NavBar";

const Main = () => {
  return (
    <div className="dark:bg-gray-950">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
      <hr />
    </div>
  );
};

export default Main;
