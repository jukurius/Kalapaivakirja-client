import { useMemo, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import useUploadContext from "../../hooks/useUploadContext";
import PropTypes from "prop-types";

const GoogleMapSelect = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const { data } = useUploadContext();
  const [location, setLocation] = useState(null);

  console.log("locationCity", data.locationCity);

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
  return <Map location={location} />;
};

const Map = ({ location }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = useMemo(() => (location), [location]);
  return (
    <div className="lg:w-[800px] lg:h-[620px]">
      {location?.lat && (
        <GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle}>
          <Marker position={center} zIndex={1200} />
        </GoogleMap>
      )}
    </div>
  );
};

Map.propTypes = {
  location: PropTypes.object.isRequired,
};

export default GoogleMapSelect;
