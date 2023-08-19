import InfiniteCarousel from "../reuseables/InfiniteCarousel";
import PropTypes from "prop-types";

const CarouselSection = ({ posts }) => {
  return (
    <div className="py-20">
      <div className="flex flex-col items-center justify-center mb-5 lg:mb-20">
        <div className="flex flex-col gap-4 container mx-auto px-5 max-w-7xl mb-20">
          <h2 className="text-2xl lg:text-[42px] font-black text-black mb-3">
            Yhteisön Upeat Kalasaaliit
          </h2>
          <div className="max-w-[30rem] lg:max-w-[38rem]">
            <p className="text-sm lg:text-lg">
              Tutustu jäsentemme upeisiin saaliisiin ja kalastuskokemuksiin.
              Karuselli esittelee intohimoisten kalastajien tuoreimpia
              saavutuksia eri vesistöissä. Liity mukaan yhteisöön ja inspiroidu
              seikkailuista, suurista kaloista ja huikeista hetkistä vesillä.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <InfiniteCarousel posts={posts} />
      </div>
    </div>
  );
};

CarouselSection.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CarouselSection;
