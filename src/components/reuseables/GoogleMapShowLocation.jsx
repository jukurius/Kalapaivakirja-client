import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";

const GoogleMapShowLocation = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const location = { lat: lat, lng: lng }; // TODO: Tänne tulee undefined selvitä
  console.log(location);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <div>{lat && <Map location={location} />}</div>;
};

const Map = ({ location }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "0 0.5rem 0.5rem 0.5rem",
  };
  console.log(location);
  const center = useMemo(() => location, [location]);
  return (
    <div>
      <h4 className="bg-white ps-2 pe-10 rounded-t-lg py-2 inline-block text-gray-500 text-xs tracking-widest">TARKKA SIJAINTI</h4>
      <div className="lg:w-[1216px] lg:h-[620px]">
        {location?.lat && location?.lng && (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerStyle={containerStyle}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

GoogleMapShowLocation.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

Map.propTypes = {
  location: PropTypes.object,
};

export default GoogleMapShowLocation;
