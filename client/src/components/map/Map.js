import React, { useEffect, useState } from "react";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";

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
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({});
  const [hoveredQueue, setHoveredQueue] = useState([]);

  const mapRef = React.useRef();

  useEffect(() => {
    if (hoveredMarker) {
      setHoveredQueue((current) => [...current, hoveredMarker]);
    } else {
      setHoveredQueue((current) =>
        current.filter((marker) => current[current.length - 1].id === marker.id)
      );
    }
  }, [hoveredMarker]);

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
    setPixelPos({
      x: -1 * (window.innerWidth / 2 - event.pixel.x),
      y: -1 * (window.innerHeight / 2 - event.pixel.y),
    });
    // setIsPinShown(true);

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
      {/* {hoveredMarker &&  ( */}

      {/* )} */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        onMouseMove={(e) => {
          setMousePos(e.pixel);
          // console.log(e.pixel);
        }}
      >
        {hoveredQueue.map(() => (
          <HoverEffect
            mousePos={mousePos}
            marker={hoveredMarker}
            selectedMarker={selectedMarker}
            hoveredMarker={hoveredMarker}
          />
        ))}
        {filteredMarkers.map((marker) => (
          <MarkerLogic
            marker={marker}
            hoveredMarker={hoveredMarker}
            panTo={panTo}
            setHoveredMarker={setHoveredMarker}
            setSelectedMarker={setSelectedMarker}
            selectedMarker={selectedMarker}
            isPinShown={isPinShown}
          />
        ))}

        {isPinShown && (
          <Pin
            pixelPos={pixelPos}
            setPixelPos={setPixelPos}
            mousePos={mousePos}
            pinPos={pinPos}
            setPinPos={setPinPos}
            setIsPinShown={setIsPinShown}
            isPinShown={isPinShown}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
