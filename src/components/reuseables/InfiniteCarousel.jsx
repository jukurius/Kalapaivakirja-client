// import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules'
import "swiper/css";
import "swiper/css/autoplay";
import PropTypes from "prop-types";

const InfiniteCarousel = ({ posts }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      allowTouchMove={false}
      speed={10000}
      spaceBetween={4}
      slidesPerView={4}
      autoplay={{
        delay: 1,
        disableOnInteraction: false,
      }}
      loop={true}
      style={{
        "--swiper-wrapper-transition-timing-function": "linear",
      }}
      breakpoints={{
        // When window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 4,
        },
        // When window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 4,
        },
        // When window width is >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 4,
        },
        920: {
          slidesPerView: 4,
          spaceBetween: 4,
        }
      }}
    >
      {posts?.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="rounded-lg">
            <img
              className="w-full max-h-[420px] mb-4 rounded-md"
              src={item?.images?.length > 0 ? item.images[0] : null}
              alt={`Slide ${index}`}
            />
            <div className="ps-2">
              <h2 className="text-md lg:text-lg font-semibold mb-2">
                {item.species_name}, {item.weight} kg
              </h2>
              <p className="text-gray-700 text-sm">
                {item.location_city}, {item.location_province}
              </p>
              <p className="text-gray-700 text-sm">
                {item.username}, {item.date}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

InfiniteCarousel.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InfiniteCarousel;
