import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AllRestaurentsItems from "../pages/AllRestaurrentsItems/AllRestaurentsItems";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "allrestaurentsitems",
        element: <AllRestaurentsItems></AllRestaurentsItems>,
      },
    ],
  },
]);
export default router;
