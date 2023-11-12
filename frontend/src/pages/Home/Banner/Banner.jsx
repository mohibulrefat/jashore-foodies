import banner from "../../../assets/banner.png";
const Banner = () => {
  return (
    <div className="w-11/12 mx-auto flex gap-5">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-semibold ">
          Your Favorite <span className="text-[#E94339]">Food</span> <br /> and{" "}
          <span className="text-[#E94339]">Restaturant</span> Partner
        </h1>
        <p className="">
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
