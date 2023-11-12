import { createBrowserRouter } from "react-router-dom";
import Additems from "../Dashborad/Restaurant/AddItems/AddItems";
import AddTable from "../Dashborad/Restaurant/AddTable/AddTable";
import RestaurantHome from "../Dashborad/Restaurant/Home/RestaurantHome";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import { AllOffers } from "../pages/AllOffers/AllOffers";
import AllRestaurents from "../pages/AllRestaurents/AllRestaurents";
import AllRestaurantsItems from "../pages/AllRestaurrentsItems/AllRestaurentsItems";
import RegisterDeliveryMan from "../pages/Authentication/RegisterDeliveryMan";
import RegisterRestaurant from "../pages/Authentication/RegisterRestaurant";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import Home from "../pages/Home/Home";
import OrderRequest from "../Dashborad/Restaurant/OrderRequest/OrderRequest";
import ReservationRequest from "../Dashborad/Restaurant/ReservationRequest/ReservationRequest";

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
        path: "registerrestaurant",
        element: <RegisterRestaurant></RegisterRestaurant>,
      },
      {
        path: "registerdeliveryman",
        element: <RegisterDeliveryMan></RegisterDeliveryMan>,
      },
      {
        path: "allrestaurantsitems",
        element: <AllRestaurantsItems></AllRestaurantsItems>,
      },
      {
        path: "offers",
        element: <AllOffers></AllOffers>,
      },
      {
        path: "allrestaurants",
        element: <AllRestaurents></AllRestaurents>,
      },
      {
        path: "additems",
        element: <Additems></Additems>,
      },
      {
        path: "restaturantregister",
        element: <RegisterRestaurant></RegisterRestaurant>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Restaurant routes
      {
        path: "restauranthome",
        element: <RestaurantHome></RestaurantHome>,
      },
      {
        path: "additem",
        element: <Additems></Additems>,
      },
      {
        path: "addtable",
        element: <AddTable></AddTable>,
      },
      {
        path: "orderrequest",
        element: <OrderRequest></OrderRequest>
      },
      {
        path: "reservationrequest",
        element: <ReservationRequest></ReservationRequest>
      }
    ],
  },
]);
export default router;
