import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropTypes from "prop-types";
import "./slider.css";

const Slider = ({ images }) => {
  const imageArr = images.map((item) => {
    return item.image_url;
  });
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      loop={true}
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
    >
      {imageArr.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className="flex justify-center items-center object-cover max-h-[670px] w-full slider-container rounded-md"
          >
            <img
              className="object-cover bg-center rounded-lg shadow-lg"
              src={image}
              alt={`Slide ${index}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

Slider.propTypes = {
  images: PropTypes.string,
};

export default Slider;
