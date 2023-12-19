import { BsArrowRight } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const Banner = () => {
  return (
    <div className="w-full p-2 md:w-10/12 mx-auto dark:bg-gray-900 mt-5 rounded">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="hero ">
            <div className="hidden md:block">
              <div className="hero-content flex justify-evenly ">
                <img
                  src="https://i.ibb.co/9qDqsyh/banner.png"
                  className="w-[600px] h-[400px] ml-10 rounded-lg mb-10 border"
                />
                <div className="w-1/2 ml-10 ">
                  <div className="flex flex-col  ">
                    <h1 className="text-6xl font-semibold dark:text-white">
                      Your Favorite <span className="text-[#E94339]">Food</span>{" "}
                      <br /> and
                      <span className="text-[#E94339]"> Restaturant</span>
                    </h1>
                    <p className="mt-4 dark:text-white">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.
                    </p>
                    <button className="btn bg-[#E94339] text-white font-bold border-0 w-[30%] mt-4 dark:bg-gray-600">
                      About Us{" "}
                      <span className="ml-3">
                        <BsArrowRight></BsArrowRight>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" block md:hidden">
              <div className="hero-content flex justify-evenly">
                <img
                  src="https://i.ibb.co/9qDqsyh/banner.png"
                  className="w-full h-[400px] rounded-lg"
                />
                <div className="absolute  h-full flex items-center  left-0 top-0 bg-gradient-to-r from-[#f9b3af] to-[rgba(30, 30, 30, 30)]">
                  <div className="text-black space-y-7 w-1/2 pl-12">
                    <h2 className=" font-bold text-lg dark:text-white">
                      Your Favorite Food and Restaurant
                    </h2>
                    <p className="font-bold">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.{" "}
                    </p>
                    <div>
                      <button className="btn text-white mr-5 bg-[#E94339] border-0">
                        Explore More
                        <span className="">
                          <BsArrowRight></BsArrowRight>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="hero">
          <div className="hero ">
            <div className="hidden md:block">
              <div className="hero-content flex justify-evenly ">
                <img
                  src="https://i.ibb.co/Dfnh9nr/360-F-186655426-U5-SKe-TOr-Qrw3nq7-F6-Sj-L6v-BYxo-W2a-JAv.jpg"
                  className="w-[600px] h-[400px] ml-10 rounded-lg mb-10 dark:border"
                />
                <div className="w-1/2 ml-10 ">
                  <div className="flex flex-col ">
                    <h1 className="text-6xl font-semibold dark:text-white">
                      Your Favorite <span className="text-[#E94339]">Food</span>{" "}
                      <br /> and
                      <span className="text-[#E94339]"> Restaturant</span>
                    </h1>
                    <p className="mt-4 dark:text-white">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.
                    </p>
                    <button className="btn w-[30%] mt-4 bg-[#E94339] text-white font-bold border-0 dark:bg-gray-600">
                      About Us{" "}
                      <span className="ml-3">
                        <BsArrowRight></BsArrowRight>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <div className="hero-content flex justify-evenly">
              <img
                src="https://i.ibb.co/Dfnh9nr/360-F-186655426-U5-SKe-TOr-Qrw3nq7-F6-Sj-L6v-BYxo-W2a-JAv.jpg"
                className="w-full h-[400px] rounded-lg"
              />
              <div className="absolute  h-full flex items-center  left-0 top-0 bg-gradient-to-r from-[#f9b3af] to-[rgba(30, 30, 30, 30)]">
                <div className="text-black space-y-7 w-1/2 pl-12">
                  <h2 className=" font-bold text-lg dark:text-white">
                    Your Favorite Food and Restaurant
                  </h2>
                  <p className="font-bold dark:text-white">
                    The food at your doorstep. Why starve when you have us. You
                    hunger partner. Straight out of the oven to your doorstep.{" "}
                  </p>
                  <div>
                    <button className="btn text-white mr-5 bg-[#E94339] border-0">
                      Explore More
                      <span className="">
                        <BsArrowRight></BsArrowRight>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero">
            <div className="hidden md:block">
              <div className="hero-content flex justify-evenly ">
                <img
                  src="https://i.ibb.co/HH9cBhq/side-view-baked-chicken-with-cucumber-lemon-seasoning-bread-table.jpg"
                  className="w-[600px] h-[400px] ml-10 rounded-lg mb-10 dark:border"
                />
                <div className="w-1/2 ml-10 ">
                  <div className="flex flex-col ">
                    <h1 className="text-6xl font-semibold dark:text-white">
                      Your Favorite <span className="text-[#E94339]">Food</span>{" "}
                      <br /> and
                      <span className="text-[#E94339]"> Restaturant</span>
                    </h1>
                    <p className="mt-4 dark:text-white">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.
                    </p>
                    <button className="btn w-[30%] mt-4 bg-[#E94339] text-white font-bold border-0 dark:bg-gray-600">
                      About Us{" "}
                      <span className="ml-3">
                        <BsArrowRight></BsArrowRight>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" block md:hidden">
              <div className="hero-content flex justify-evenly">
                <img
                  src="https://i.ibb.co/HH9cBhq/side-view-baked-chicken-with-cucumber-lemon-seasoning-bread-table.jpg"
                  className="w-full h-[400px] rounded-lg"
                />
                <div className="absolute  h-full flex items-center  left-0 top-0 bg-gradient-to-r from-[#f9b3af] to-[rgba(30, 30, 30, 30)]">
                  <div className="text-black space-y-7 w-1/2 pl-12">
                    <h2 className=" font-bold text-lg">
                      Your Favorite Food and Restaurant
                    </h2>
                    <p className="font-bold">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.{" "}
                    </p>
                    <div>
                      <button className="btn text-white mr-5 bg-[#E94339] border-0">
                        Explore More
                        <span className="">
                          <BsArrowRight></BsArrowRight>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero">
            <div className="hidden md:block">
              <div className="hero-content flex justify-evenly ">
                <img
                  src="https://i.ibb.co/9vjdRCN/deliveryman.jpg"
                  className="w-[600px] h-[400px] ml-10 rounded-lg mb-10 "
                />
                <div className="w-1/2 ml-10 ">
                  <div className="flex flex-col ">
                    <h1 className="text-6xl font-semibold dark:text-white">
                      Your Favorite <span className="text-[#E94339]">Food</span>{" "}
                      <br /> and
                      <span className="text-[#E94339]"> Restaturant</span>
                    </h1>
                    <p className="mt-4 dark:text-white">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.
                    </p>
                    <button className="btn w-[30%] mt-4 bg-[#E94339] text-white font-bold border-0 dark:bg-gray-600">
                      About Us{" "}
                      <span className="ml-3">
                        <BsArrowRight></BsArrowRight>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" block md:hidden">
              <div className="hero-content flex justify-evenly">
                <img
                  src="https://i.ibb.co/9vjdRCN/deliveryman.jpg"
                  className="w-[600px] h-[400px] rounded-lg"
                />
                <div className="absolute  h-full flex items-center  left-0 top-0 bg-gradient-to-r from-[#f9b3af] to-[rgba(30, 30, 30, 30)]">
                  <div className="text-black space-y-7 w-1/2 pl-12">
                    <h2 className=" font-bold text-lg dark:text-white">
                      Your Favorite Food and Restaurant
                    </h2>
                    <p className="font-bold dark:text-white">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.{" "}
                    </p>
                    <div>
                      <button className="btn text-white mr-5 bg-[#E94339] border-0">
                        Explore More
                        <span className="">
                          <BsArrowRight></BsArrowRight>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="hero">
            <div className="hidden md:block">
              <div className="hero-content flex justify-evenly ">
                <img
                  src="https://i.ibb.co/86qDLdB/interior-dinner-new-modern-indoor.jpg"
                  className="w-[600px] h-[400px] ml-10 rounded-lg mb-10 dark:border"
                />
                <div className="w-1/2 ml-10 ">
                  <div className="flex flex-col ">
                    <h1 className="text-6xl font-semibold dark:text-white">
                      Your Favorite <span className="text-[#E94339]">Food</span>{" "}
                      <br /> and
                      <span className="text-[#E94339]"> Restaturant</span>
                    </h1>
                    <p className="mt-4 dark:text-white">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.
                    </p>
                    <button className="btn w-[30%] mt-4 bg-[#E94339] text-white font-bold border-0 dark:bg-gray-600">
                      About Us{" "}
                      <span className="ml-3">
                        <BsArrowRight></BsArrowRight>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" block md:hidden">
              <div className="hero-content flex justify-evenly">
                <img
                  src="https://i.ibb.co/86qDLdB/interior-dinner-new-modern-indoor.jpg"
                  className="w-full h-[400px] rounded-lg"
                />
                <div className="absolute  h-full flex items-center  left-0 top-0 bg-gradient-to-r from-[#f9b3af] to-[rgba(30, 30, 30, 30)]">
                  <div className="text-black space-y-7 w-1/2 pl-12">
                    <h2 className=" font-bold text-lg">
                      Your Favorite Food and Restaurant
                    </h2>
                    <p className="font-bold">
                      The food at your doorstep. Why starve when you have us.
                      You hunger partner. Straight out of the oven to your
                      doorstep.{" "}
                    </p>
                    <div>
                      <button className="btn text-white mr-5 bg-[#E94339] border-0">
                        Explore More
                        <span className="">
                          <BsArrowRight></BsArrowRight>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
