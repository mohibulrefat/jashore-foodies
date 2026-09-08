import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../Dashborad/Admin/Home/AdminHome";
import VerifyRestaurant from "../Dashborad/Admin/VerifyRestauant/VerifyRestaurant";
import CustomerHome from "../Dashborad/Customer/Home/CustomerHome";
import MyCart from "../Dashborad/Customer/MyCart/MyCart";
import MyOrders from "../Dashborad/Customer/MyOrders/MyOrders";
import MyReservations from "../Dashborad/Customer/MyReservations/MyReservations";
import PaymentHistory from "../Dashborad/Customer/PaymentHistory/PaymentHistory";
import Additems from "../Dashborad/Restaurant/AddItems/AddItems";
import AddTable from "../Dashborad/Restaurant/AddTable/AddTable";
import CurrentOrder from "../Dashborad/Restaurant/CurrentOrder/CurrentOrder";
import AuthorityFeedback from "../Dashborad/Restaurant/Feedback/AuthorityFeedback";
import RestaurantHome from "../Dashborad/Restaurant/Home/RestaurantHome";
import MyItems from "../Dashborad/Restaurant/MyItems/MyItems";
import MyTables from "../Dashborad/Restaurant/MyTables/MyTables";
import TableReservation from "../Dashborad/Restaurant/TableReservation/TableReservation";
import UpdateItem from "../Dashborad/Restaurant/UpdateItem/UpdateItem";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import { AllOffers } from "../pages/AllOffers/AllOffers";
import ChangePassword from "../pages/Authentication/ChangePassword";
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
import OrderHistory from "../Dashborad/Restaurant/OrderHistory/OrderHistory";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import PrivateRoute from "./PrivateRoute";
import RestaurantRoute from "./RestaurantRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "signin", element: <SignIn></SignIn> },
      { path: "signup", element: <SignUp></SignUp> },
      { path: "registerrestaurant", element: <RegisterRestaurant></RegisterRestaurant> },
      { path: "registerdeliveryman", element: <RegisterDeliveryMan></RegisterDeliveryMan> },
      { path: "allitems", element: <Items></Items> },
      { path: "offers", element: <AllOffers></AllOffers> },
      { path: "allrestaurants", element: <Restaurants></Restaurants> },
      { path: "restaturantregister", element: <RegisterRestaurant></RegisterRestaurant> },
      { path: "reservetable", element: <ReserveTable></ReserveTable> },
      { path: "restaurantdetails/:restaurantId", element: <RestaurantDetails></RestaurantDetails> },
      {
        path: "reservetabledetails/:tableId",
        element: (
          <PrivateRoute>
            <ReserveTableDetails></ReserveTableDetails>
          </PrivateRoute>
        ),
      },
      { path: "payment/success/:tranId", element: <Successfull></Successfull> },
      { path: "payment/failed/:tranId", element: <Failed></Failed> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      { path: "change-password", element: <ChangePassword></ChangePassword> },
      // Customer
      { path: "customer", element: <CustomerRoute><CustomerHome></CustomerHome></CustomerRoute> },
      { path: "myreservations", element: <CustomerRoute><MyReservations></MyReservations></CustomerRoute> },
      { path: "paymenthistory", element: <CustomerRoute><PaymentHistory></PaymentHistory></CustomerRoute> },
      { path: "mycart", element: <CustomerRoute><MyCart></MyCart></CustomerRoute> },
      { path: "myorders", element: <CustomerRoute><MyOrders></MyOrders></CustomerRoute> },
      // Restaurant
      { path: "restaurant", element: <RestaurantRoute><RestaurantHome></RestaurantHome></RestaurantRoute> },
      { path: "authorityfeedback", element: <RestaurantRoute><AuthorityFeedback></AuthorityFeedback></RestaurantRoute> },
      { path: "additem", element: <RestaurantRoute><Additems></Additems></RestaurantRoute> },
      { path: "myitems", element: <RestaurantRoute><MyItems></MyItems></RestaurantRoute> },
      { path: "updateitem/:id", element: <RestaurantRoute><UpdateItem></UpdateItem></RestaurantRoute> },
      { path: "addtable", element: <RestaurantRoute><AddTable></AddTable></RestaurantRoute> },
      { path: "mytables", element: <RestaurantRoute><MyTables></MyTables></RestaurantRoute> },
      { path: "restaurantcurrentorder", element: <RestaurantRoute><CurrentOrder></CurrentOrder></RestaurantRoute> },
      { path: "restaurnatorderhistory", element: <RestaurantRoute><OrderHistory></OrderHistory></RestaurantRoute> },
      { path: "tablereservation", element: <RestaurantRoute><TableReservation></TableReservation></RestaurantRoute> },
      // Admin
      { path: "verifyrestaurants", element: <AdminRoute><VerifyRestaurant></VerifyRestaurant></AdminRoute> },
      { path: "admin", element: <AdminRoute><AdminHome></AdminHome></AdminRoute> },
    ],
  },
]);
export default router;
