import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../Dashborad/Admin/Home/AdminHome";
import VerifyRestaurant from "../Dashborad/Admin/VerifyRestauant/VerifyRestaurant";
import CustomerHome from "../Dashborad/Customer/Home/CustomerHome";
import MyCart from "../Dashborad/Customer/MyCart/MyCart";
import OrderDetails from "../Dashborad/Customer/MyCart/OrderDetails";
import MyReservations from "../Dashborad/Customer/MyReservations.jsx/MyReservations";
import PaymentHistory from "../Dashborad/Customer/PaymentHistory/PaymentHistory";
import Additems from "../Dashborad/Restaurant/AddItems/AddItems";
import AddTable from "../Dashborad/Restaurant/AddTable/AddTable";
import AuthorityFeedback from "../Dashborad/Restaurant/Feedback/AuthorityFeedback";
import RestaurantHome from "../Dashborad/Restaurant/Home/RestaurantHome";
import MyItems from "../Dashborad/Restaurant/MyItems/MyItems";
import MyTables from "../Dashborad/Restaurant/MyTables/MyTables";
import OrderRequest from "../Dashborad/Restaurant/OrderRequest/OrderRequest";
import TableReservation from "../Dashborad/Restaurant/TableReservation/TableReservation";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import { AllOffers } from "../pages/AllOffers/AllOffers";
import RegisterDeliveryMan from "../pages/Authentication/RegisterDeliveryMan";
import RegisterRestaurant from "../pages/Authentication/RegisterRestaurant";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import Home from "../pages/Home/Home";
import Items from "../pages/Items/Items";
import Failed from "../pages/PaymentStatus/Failed";
import Successfull from "../pages/PaymentStatus/Successfull";
import ReserveTable from "../pages/ReserveTable/ReserveTable";
import ReserveTableDetails from "../pages/ReserveTable/ReserveTableDetails";
import RestaurantDetails from "../pages/RestaurantDetails/RestaurantDetails";
import Restaurants from "../pages/Restaurants/Restaurants";
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
        path: "allitems",
        element: <Items></Items>,
      },
      {
        path: "offers",
        element: <AllOffers></AllOffers>,
      },
      {
        path: "allrestaurants",
        element: <Restaurants></Restaurants>,
      },
      {
        path: "additems",
        element: <Additems></Additems>,
      },
      {
        path: "restaturantregister",
        element: <RegisterRestaurant></RegisterRestaurant>,
      },
      {
        path: "reservetable",
        element: <ReserveTable></ReserveTable>,
      },
      {
        path: "restaurantdetails/:restaurantId",
        element: <RestaurantDetails></RestaurantDetails>,
      },
      {
        path: "reservetabledetails/:tableId",
        element: <ReserveTableDetails></ReserveTableDetails>,
      },
      {
        path: "payment/success/:tranId",
        element: <Successfull></Successfull>,
      },
      {
        path: "payment/failed/:tranId",
        element: <Failed></Failed>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Customer Routes
      {
        path: "customer",
        element: <CustomerHome></CustomerHome>,
      },
      {
        path: "myreservations",
        element: <MyReservations></MyReservations>,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "mycart",
        element: <MyCart></MyCart>,
      },
      {
        path: "orderdetails",
        element: <OrderDetails></OrderDetails>,
      },
      // Restaurant routes
      {
        path: "restaurant", //restaurant home
        element: <RestaurantHome></RestaurantHome>,
      },
      {
        path: "authorityfeedback", //feedback from authority
        element: <AuthorityFeedback></AuthorityFeedback>,
      },
      {
        path: "additem",
        element: <Additems></Additems>,
      },
      {
        path: "myitems",
        element: <MyItems></MyItems>,
      },
      {
        path: "addtable",
        element: <AddTable></AddTable>,
      },
      {
        path: "mytables",
        element: <MyTables></MyTables>,
      },
      {
        path: "orderrequest",
        element: <OrderRequest></OrderRequest>,
      },
      {
        path: "tablereservation",
        element: <TableReservation></TableReservation>,
      },
      // Admin route
      {
        path: "verifyrestaurants",
        element: <VerifyRestaurant></VerifyRestaurant>,
      },
      {
        path: "admin",
        element: <AdminHome></AdminHome>,
      },
    ],
  },
]);
export default router;
