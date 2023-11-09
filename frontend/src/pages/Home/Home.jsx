import NewItems from "../../components/NewItems/NewItems";
import Trending from "../../components/Trending/Trending";
import useSectionTitle from "../../hooks/useSectionTitle";

const Home = () => {
  return (
    <div>
      {useSectionTitle(
        "Bigg Offer",
        "For in this week, take your food, buy your best one"
      )}
      <h1>Offers</h1>

      {useSectionTitle("New Items", "Discover our latest menu additions")}
      <NewItems></NewItems>

      {useSectionTitle("Trending", "What's hot and trending right now")}
      <Trending></Trending>

      {useSectionTitle("Reserve a Table", "Book a table and dine with us")}
      {useSectionTitle(
        "Customer Feedback",
        "What our customers are saying about us"
      )}
    </div>
  );
};

export default Home;
