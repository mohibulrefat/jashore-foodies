import feedbacklogo from "../../../assets/feedbackicon.svg";
const CustomerFeedback = () => {
  return (
    <div className="w-11/12 mx-auto flex justify-center my-5 dark:border rounded p-5 dark:border-gray-600">
      <div className="carousel">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="flex flex-col justify-center items-center w-11/12 lg:w-8/12 mx-auto">
            <img className="w-14" src={feedbacklogo} alt="" />
            <p className="font-inter italic text-lg text-[#000] font-[500] mt-5 dark:text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
              quibusdam nihil provident ut obcaecati ullam cupiditate animi
              nobis eveniet optio.
            </p>
            <img
              className="w-14 h-14 rounded-full border-2 border-[#E94339]"
              src="https://restaurantengine.com/wp-content/uploads/2013/10/Food-Trends.png"
              alt=""
            />
            <h4 className="font-inter text-base text-[#111] font-[600] mt-1 dark:text-white">
              Mitchell Marsh
            </h4>
            <h6 className="font-inter text-xs text-[#616161] mb-3 dark:text-white">
              CEO, Bexon Agency
            </h6>
            <div>
              <a
                href="#slide4"
                className="btn btn-sm btn-circle hover:bg-[#E94339]"
              >
                ❮
              </a>
              <a
                href="#slide2"
                className="btn btn-sm btn-circle hover:bg-[#E94339]"
              >
                ❯
              </a>
            </div>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div className="flex flex-col justify-center items-center w-11/12 lg:w-8/12 mx-auto">
            <img className="w-14" src={feedbacklogo} alt="" />
            <p className="font-inter italic text-lg text-[#000] font-[500] mt-5 dark:text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
              quibusdam nihil provident ut obcaecati ullam cupiditate animi
              nobis eveniet optio.
            </p>
            <img
              className="w-14 h-14 rounded-full border-2 border-[#E94339]"
              src="https://restaurantengine.com/wp-content/uploads/2013/10/Food-Trends.png"
              alt=""
            />
            <h4 className="font-inter text-base text-[#111] font-[600] mt-5 dark:text-white">
              Mitchell Marsh
            </h4>
            <h6 className="font-inter text-xs text-[#616161] mb-3">
              CEO, Bexon Agency
            </h6>
            <div>
              <a
                href="#slide1"
                className="btn btn-sm btn-circle hover:bg-[#E94339]"
              >
                ❮
              </a>
              <a
                href="#slide3"
                className="btn btn-sm btn-circle hover:bg-[#E94339]"
              >
                ❯
              </a>
            </div>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div className="flex flex-col justify-center items-center w-11/12 lg:w-8/12 mx-auto">
            <img className="w-14" src={feedbacklogo} alt="" />
            <p className="font-inter italic text-lg text-[#000] font-[500] mt-5 dark:text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
              quibusdam nihil provident ut obcaecati ullam cupiditate animi
              nobis eveniet optio.
            </p>
            <h4 className="font-inter text-base text-[#111] font-[600] mt-5 dark:text-white">
              Mitchell Marsh
            </h4>
            <img
              className="w-14 h-14 rounded-full border-2 border-[#E94339]"
              src="https://restaurantengine.com/wp-content/uploads/2013/10/Food-Trends.png"
              alt=""
            />
            <h6 className="font-inter text-xs text-[#616161] mb-3">
              CEO, Bexon Agency
            </h6>
            <div>
              <a
                href="#slide2"
                className="btn btn-sm btn-circle hover:bg-[#E94339]"
              >
                ❮
              </a>
              <a
                href="#slide4"
                className="btn btn-sm btn-circle hover:bg-[#E94339]"
              >
                ❯
              </a>
            </div>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <div className="flex flex-col justify-center items-center w-11/12 lg:w-8/12 mx-auto">
            <img className="w-14" src={feedbacklogo} alt="" />
            <p className="font-inter italic text-lg text-[#000] font-[500] mt-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
              quibusdam nihil provident ut obcaecati ullam cupiditate animi
              nobis eveniet optio.
            </p>
            <img
              className="w-14 h-14 rounded-full border-2 border-[#E94339]"
              src="https://restaurantengine.com/wp-content/uploads/2013/10/Food-Trends.png"
              alt=""
            />
            <h4 className="font-inter text-base text-[#111] font-[600] mt-5">
              Mitchell Marsh
            </h4>
            <h6 className="font-inter text-xs text-[#616161] mb-3">
              CEO, Bexon Agency
            </h6>
            <div>
              <a
                href="#slide3"
                className="btn btn-sm btn-circle hover:bg-[#E94339]"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn btn-sm btn-circle hover:bg-[#E94339]"
              >
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
