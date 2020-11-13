import React, { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

import { libraries, mapContainerStyle, center, options } from "./mapConfig";
import { getLocations } from "../../requests";
import MarkerLogic from "./MarkerLogic";
import Pin from "./Pin";
import HoverEffect from "./HoverEffect";

function Map({
  filteredMarkers,
  hoveredMarker,
  panTo,
  setFilteredMarkers,
  setHoveredMarker,
  setMarkers,
  setSelectedMarker,
  selectedMarker,
  markers,
}) {
  const [isPinShown, setIsPinShown] = useState(false);
  const [pinPos, setPinPos] = useState({});
  const [isPinDragging, setIsPinDragging] = useState(false);
  const [mousePos, setMousePos] = useState({});

  const mapRef = React.useRef();

  useEffect(() => {
    const fetchMarkers = async () => {
      const res = await getLocations();
      setMarkers(res.data);
      setFilteredMarkers(res.data);
    };
    fetchMarkers();
  }, []);

  useEffect(() => {
    setFilteredMarkers(markers);
  }, [markers]);

  const onMapClick = React.useCallback((event) => {
    // setFilteredMarkers((current) => [
    //   ...current,
    //   {
    //     lat: event.latLng.lat(),
    //     lng: event.latLng.lng(),
    //     time: new Date(),
    //   },
    // ]);
    setIsPinShown(true);

    if (selectedMarker) {
      setIsPinShown(false);
    } else {
      setIsPinShown(true);
      setPinPos({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }

    selectedMarker ? setIsPinShown(false) : setIsPinShown(true);

    // selectedMarker ? setPinPos({}) : setPinPos({lat: event.latLng.lat(), lng: event.latLng.lng()})
    setPinPos({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setSelectedMarker(null);
  }, []);

  const onMapLoad = React.useCallback((map) => (mapRef.current = map), []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      {hoveredMarker && hoveredMarker.id && (
        <HoverEffect
          mouse={mousePos}
          marker={hoveredMarker}
          selectedMarker={selectedMarker}
        />
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        onMouseMove={(e) => {
          setMousePos(e.pixel);
          console.log(e.pixel);
        }}
      >
        {filteredMarkers.map((marker) => (
          <MarkerLogic
            marker={marker}
            hoveredMarker={hoveredMarker}
            panTo={panTo}
            setHoveredMarker={setHoveredMarker}
            setSelectedMarker={setSelectedMarker}
            selectedMarker={selectedMarker}
          />
        ))}

        {isPinShown && <Pin pinPos={pinPos} setPinPos={setPinPos} />}
      </GoogleMap>
    </div>
  );
}

export default Map;
