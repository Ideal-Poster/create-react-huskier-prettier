import React, { useEffect } from "react";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";

import { libraries, mapContainerStyle, center, options } from "./mapConfig";
import { getLocations } from "../../requests";
import MarkerLogic from "./MarkerLogic";

function Map(props) {
  const {
    setMarkers,
    mapRef,
    hoveredMarker,
    filteredMarkers,
    setFilteredMarkers,
    setHoveredMarker,
    panTo,
  } = props;

  useEffect(() => {
    const fetchMarkers = async () => {
      const res = await getLocations();
      setMarkers(res.data);
      setFilteredMarkers(res.data);
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

  const onMapLoad = React.useCallback((map) => (mapRef.current = map), []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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
      {filteredMarkers.map((marker) => (
        <MarkerLogic
          props={props}
          marker={marker}
          hoveredMarker={hoveredMarker}
          setHoveredMarker={setHoveredMarker}
          panTo={panTo}
        />
      ))}
    </GoogleMap>
  );
}

export default Map;
