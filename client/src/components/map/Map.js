import React, { useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  // InfoWindow,
} from "@react-google-maps/api";
// import mapStyles from "./mapStyles";
// import { formatRelative } from "date-fns";
import { libraries, mapContainerStyle, center, options } from "./mapConfig";
// import useMouse from '@react-hook/mouse-position';

import "@reach/combobox/styles.css";
// import Search from "./Search";
import api from "../../api";

function Map(props) {
  const [markers, setMarkers] = React.useState([]);
  // const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      const res = (await api.get("/locations")).data;
      setMarkers(res);
    };
    fetchMarkers();
  }, []);

  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => (mapRef.current = map), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      {/* <Search /> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.created_at}
            position={{ lat: marker.lat, lng: marker.lng }}
            // onClick={() => setSelected(marker)}
            onMouseOver={(marker) => props.setSelected(marker)}
            onMouseOut={() => props.setSelected(null)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default Map;
