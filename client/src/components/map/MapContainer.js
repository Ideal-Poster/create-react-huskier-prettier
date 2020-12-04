import React, { useState } from "react";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles
import Map from "./Map";

import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

function MapContainer() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filterMarkers = (markers, category) => {
    if (markers) {
      setFilteredMarkers(
        markers.filter((marker) => {
          return marker.languages.some(
            (language) => language.name === category
          );
        })
      );
    }
  };

  return (
    <div className={styles.container}>
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
          filteredMarkers={filteredMarkers}
          hoveredMarker={hoveredMarker}
          markers={markers}
          setFilteredMarkers={setFilteredMarkers}
          setHoveredMarker={setHoveredMarker}
          setMarkers={setMarkers}
          setSelectedMarker={setSelectedMarker}
          selectedMarker={selectedMarker}
          isSidebarOpen={isSidebarOpen}
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
    width: "66.7vw",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
};

export default MapContainer;
