import { useMemo, useEffect, useState, useContext } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import useUploadContext from "../../hooks/useUploadContext";
import { AppContext } from "../../AppContext";
import PropTypes from "prop-types";

const GoogleMapSelect = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const { data, setData } = useUploadContext();
  const { closeModal } = useContext(AppContext);
  const [location, setLocation] = useState(null);

  const handleLocationSubmit = () => {
    setData({...data, lat: location.lat, lng: location.lng})
    closeModal();
  }

  useEffect(() => {
    const fetchGeocode = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${
            data?.locationCity
          }&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        console.log(response.data);
        setLocation(response.data.results[0].geometry.location);
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };
    fetchGeocode();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Map location={location} setLocation={setLocation} />
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
          onClick={handleLocationSubmit}
        >
          Hyväksy
        </button>
      </div>
    </div>
  );
};

const Map = ({ location, setLocation }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const handleClick = (ev) => {
    setLocation({ ...location, lat: ev.latLng.lat(), lng: ev.latLng.lng() });
  };
  console.log(location);
  const center = useMemo(() => location, [location]);
  return (
    <div className="w-full h-96 lg:w-[800px] lg:h-[620px]">
      {location?.lat && (
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={containerStyle}
          onClick={(ev) => handleClick(ev)}
        >
          <Marker position={center} zIndex={1200} />
        </GoogleMap>
      )}
    </div>
  );
};

Map.propTypes = {
  location: PropTypes.object.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default GoogleMapSelect;
