import React, { useEffect, useState } from "react";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { motion } from "framer-motion";

import { libraries, mapContainerStyle, center, options } from "./mapConfig";
import { getLocations } from "../../requests";
import MarkerLogic from "./MarkerLogic";
import Pin from "./Pin";
import HoverEffect from "./HoverEffect";

import styles from "./MapContainer.module.css";

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
  const [isPinHoverEffectShown, setIsPinHoverEffectShown] = useState(true);

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
    if (event.pixel) {
      setPixelPos({
        x: -1 * (window.innerWidth / 2 - event.pixel.x),
        y: -1 * (window.innerHeight / 2 - event.pixel.y),
      });
    }

    if (selectedMarker) {
      setIsPinShown(false);
    } else {
      setIsPinShown(true);
      setPinPos({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }

    selectedMarker ? setIsPinShown(false) : setIsPinShown(true);

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
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        onMouseMove={(e) => {
          setMousePos(e.pixel);
        }}
        onZoomChanged={() => setIsPinHoverEffectShown(false)}
        onResize={() => setIsPinHoverEffectShown(false)}
        onDragStart={() => setIsPinHoverEffectShown(false)}
      >
        {hoveredQueue.map(() => (
          <HoverEffect
            mousePos={mousePos}
            marker={hoveredMarker}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
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
            isPinHoverEffectShown={isPinHoverEffectShown}
            setIsPinHoverEffectShown={setIsPinHoverEffectShown}
          />
        )}
      </GoogleMap>

      {selectedMarker && (
        <motion.div
          className={styles.select__div}
          animate={selectedMarker ? "show" : "hidden"}
          variants={displayAnimation}
          initial={"hidden"}
          transition={{ duration: 0.2 }}
          exit={"exit"}
        >
          <p onClick={() => setSelectedMarker(null)}> hello </p>
        </motion.div>
      )}
    </div>
  );
}

const displayAnimation = {
  hidden: {
    width: "0%",
    // scaleX: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.4,
    },
  },
  show: {
    width: "100%",
    // scaleX: 1,
    transition: {
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
      duration: 0.4,
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
export default Map;
