import banner from "../../../assets/banner.png";
const Banner = () => {
  return (
    <div className="w-11/12 mx-auto flex">
      <div className="flex flex-col items-center justify-center">
        <h1>Your Favorite Food Delivery Partner</h1>
        <p>
          The food at your doorstep. Why starve when you have us. You hunger
          partner. Straight out of the oven to your doorstep.{" "}
        </p>
      </div>
      <div>
        <img className="w-[450px] h-[412px]" src={banner} alt="" />
      </div>
    </div>
  );
};

export default Banner;
