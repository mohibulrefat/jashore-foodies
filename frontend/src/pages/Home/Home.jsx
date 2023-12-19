import useSectionTitle from "../../hooks/useSectionTitle";
import Banner from "./Banner/Banner";
import BigOffer from "./BigOffer/BigOffer";
import CustomerFeedback from "./CustomerFeedback/CustomerFeedback";
import NewItems from "./NewItems/NewItems";
import ReserveTableHome from "./ReserveTableHome/ReserveTableHome";
import Trending from "./Trending/Trending";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      {useSectionTitle(
        "Bigg Offer",
        "For in this week, take your food, buy your best one"
      )}
      <BigOffer></BigOffer>

      {useSectionTitle("New Items", "Discover our latest menu additions")}
      <NewItems></NewItems>

      {useSectionTitle("Trending", "What's hot and trending right now")}
      <Trending></Trending>
      {useSectionTitle("Reserve a Table", "Book a table and dine with us")}
      <ReserveTableHome></ReserveTableHome>
      {useSectionTitle(
        "Customer Feedback",
        "What our customers are saying about us"
      )}
      <CustomerFeedback></CustomerFeedback>
    </div>
  );
};

export default Home;
