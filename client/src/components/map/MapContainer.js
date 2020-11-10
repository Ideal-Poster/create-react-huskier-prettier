import React, { useState, useEffect } from "react";
import useMouse from "@react-hook/mouse-position";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles
import Map from "./Map";

import HoverEffect from "./HoverEffect";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

function MapContainer() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const selectMarker = (marker) => {
    setSelectedMarker(marker);
  };

  const deselectMarker = () => {
    setSelectedMarker(null);
  };

  const filterMarkers = (markers, category) => {
    setFilteredMarkers(
      markers.filter((marker) => {
        return marker.languages.some((language) => language.name === category);
      })
    );
  };

  const mapRef = React.useRef();
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  });

  return (
    <div className={styles.container} ref={ref}>
      {selectedMarker && <HoverEffect mouse={mouse} marker={selectedMarker} />}
      <Sidebar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        filterMarkers={filterMarkers}
        markers={markers}
      />
      <motion.div
        className="map__div"
        variants={containerAnimation}
        initial="hidden"
        animate={isSidebarOpen ? "show" : "hidden"}
      >
        <Map
          mapRef={mapRef}
          markers={markers}
          filteredMarkers={filteredMarkers}
          setMarkers={setMarkers}
          selectedMarker={selectedMarker}
          selectMarker={selectMarker}
          deselectMarker={deselectMarker}
          setFilteredMarkers={setFilteredMarkers}
        />
      </motion.div>
    </div>
  );
}

const containerAnimation = {
  hidden: {
    width: "100vw",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
  show: {
    width: "60vw",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
};

export default MapContainer;
