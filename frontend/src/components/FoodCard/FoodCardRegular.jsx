import { BsCartCheck } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
const FoodCardRegular = () => {
  return (
    <div className="p-5 bg-[#fff8ee] rounded shadow shadow-red-200">
      <img
        className="rounded shadow-2xl shadow-red-200"
        src="https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger.jpg"
        alt=""
      />
      <h1 className="text-xl text-[#3E312D] font-[700] font-inter mt-2 border-b-2 border-red-400">
        Temp Burgir
      </h1>
      <h4 className="text-base text-right mb-2">
        from <span className="font-semibold ">Al Hillal Restaurents</span>
      </h4>
      <div className="flex justify-between my-1">
        <p
          className="bg-[#ADBC76] text-[#3E312D] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #8B9664" }}
        >
          Beef
        </p>
        <p
          className="bg-[#F6F1F2] text-[#675465] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #8D8082" }}
        >
          Lola Chese
        </p>
        <p
          className="bg-[#F6D6A2] text-[#67350A] text-base font-poppins py-1 px-2 rounded-2xl min-w-[70px] text-center"
          style={{ boxShadow: "1px 1.3px 1px 0px #DCB57E" }}
        >
          Yo Yo Sauce
        </p>
      </div>
      <p className="py-2">
        Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Id, quas?
      </p>
      <div className="flex justify-between mt-2">
        <p className="flex items-center text-xl font-semibold">
          <span>20</span>
          <TbCurrencyTaka></TbCurrencyTaka>
        </p>
        <button className="text-red-400">
          <BsCartCheck size={20}></BsCartCheck>
        </button>
        <button>Details</button>
      </div>
    </div>
  );
};

export default FoodCardRegular;
