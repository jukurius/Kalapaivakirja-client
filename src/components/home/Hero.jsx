import fisher from "../../assets/hero-fisher.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-custom-light-gray">
      <div className="container mx-auto px-5 py-10 lg:py-40 flex flex-col md:flex-row justify-center sm:gap-10">
        <div className="max-w-3xl flex flex-col gap-10 align-center justify-center order-2 md:order-1">
          <div>
            {/* <span className="text-2xl font-bold">Tervetuloa</span> */}
            <h1 className="text-3xl sm:text-4xl xl:text-6xl mt-1 mb-6 text-custom-dark-blue font-black">
              Kalapäiväkirja
            </h1>
            <p className="text-sm lg:text-lg mb-4">
              Tervetuloa Kalapäiväkirja -yhteisöön, jossa kalastusharrastajat
              kohtaavat ja jakavat saaliinsa jännittävimmät hetket!
            </p>
            <p className="text-sm lg:text-lg">
              Luo käyttäjätili ja liity kasvavaan kalastusyhteisöön, joka on
              täynnä intohimoa ja tietoa. Käyttäjätilin luomisen jälkeen voit
              tallentaa saamasi kalasaaliit sovellukseen. Jaettuasi saaliisi,
              muut käyttäjät voivat ihailla ja kommentoida saavutustasi. Olipa
              se hauki, ahven, tai mikä tahansa kalalaji, yhteisössämme jokainen
              saalis on arvokas tarina.
            </p>
          </div>
          <div>
            <p className="mb-6 text-sm lg:text-lg">Etkö ole vielä jäsen?</p>
            <Link
              to="/register"
              className="bg-custom-dark-blue hover:bg-custom-dark-blue text-white font-bold py-2.5 px-6 lg:py-4 lg:px-10 rounded mt-4"
            >
              Liity mukaan
            </Link>
          </div>
        </div>
        <div className="mx-auto md:mx-0 order-1 md:order-2">
          <img src={fisher} alt="hero-fisher" className="max-w-xs sm:min-w-[400px] lg:max-w-full lg:w-96" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
