import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import Home from "../pages/Home/Home";
import { AllOffers } from "../pages/AllOffers/AllOffers";
import AllRestaurantsItems from "../pages/AllRestaurrentsItems/AllRestaurentsItems";

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
        path: "allrestaurantsitems",
        element: <AllRestaurantsItems></AllRestaurantsItems>
      },
      {
        path: "offers",
        element: <AllOffers></AllOffers>
      }
    ],
  },
]);
export default router;
