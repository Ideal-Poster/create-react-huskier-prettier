import React, { useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

import { libraries, mapContainerStyle, center, options } from "./mapConfig";
import { getLocations } from "../../requests";
import MarkerLogic from "./MarkerLogic";

function Map(props) {
  const { markers, setMarkers, panTo, mapRef } = props;
  useEffect(() => {
    const fetchMarkers = async () => {
      const res = await getLocations();
      setMarkers(res.data);
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

  // const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => (mapRef.current = map), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // const panTo = React.useCallback(({lat, lng}) => {
  //   mapRef.current.panTo({lat, lng});
  // });

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {markers.map((marker) => (
        <MarkerLogic props={props} marker={marker} />
      ))}
    </GoogleMap>
  );
}

export default Map;
