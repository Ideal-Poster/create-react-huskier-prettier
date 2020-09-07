import React, { useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

import { libraries, mapContainerStyle, center, options } from "./mapConfig";
import api from "../../api";

function Map(props) {
  const { markers, setMarkers } = props;
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

  // console.log(markers);
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {markers.map((marker) => {
        // console.log(marker);
        return (
          <Marker
            key={marker.created_at}
            position={{ lat: marker.lat, lng: marker.lng }}
            onMouseOver={() => props.selectMarker(marker)}
            onMouseOut={() => props.deselectMarker(marker)}
          />
        );
      })}
    </GoogleMap>
  );
}

export default Map;
