import { BsArrowRightCircle } from "react-icons/bs";
import BigOfferCard from "./BigOfferCard";

const BigOffer = () => {
  return (
    <div>
      <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
        {Array.from({ length: 4 }, (_, i) => (
          <BigOfferCard key={i}></BigOfferCard>
        ))}
      </div>
      <div className="flex justify-end w-11/12 mx-auto">
        <button className="bg-red-100 text-[#E94339] my-1 flex items-center gap-1 justify-center px-1 rounded-full btn-sm text-base">
          <span>See more</span> <BsArrowRightCircle></BsArrowRightCircle>
        </button>
      </div>
    </div>
  );
};

export default BigOffer;
