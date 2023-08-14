import fisher from "../../assets/hero-fisher.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-custom-light-gray">
      <div className="container mx-auto px-5 py-20 lg:py-40 flex flex-col md:flex-row justify-center sm:gap-10">
        <div className="mx-auto md:mx-0">
          <img
            src={fisher}
            alt="hero-fisher"
            className="max-w-xs lg:w-96"
          />
        </div>
        <div className="max-w-lg flex flex-col gap-10 align-center justify-center">
          <div>
            <span className="text-2xl font-bold">Tervetuloa</span>
            <h1 className="text-3xl sm:text-4xl xl:text-6xl mt-1 mb-6 text-custom-dark-blue font-black">
              Kalapäiväkirjaan
            </h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              veritatis quas rerum dignissimos tempore obcaecati sequi
              repellendus nihil, magnam porro.
            </p>
          </div>
          <div>
            <p className="mb-6">Etkö ole vielä jäsen?</p>
            <Link
              to="/register"
              className="bg-custom-dark-blue hover:bg-custom-dark-blue text-white font-bold py-4 px-10 rounded mt-4"
            >
              Liity mukaan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
