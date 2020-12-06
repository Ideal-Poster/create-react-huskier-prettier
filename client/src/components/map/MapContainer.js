import React, { useState, useEffect } from "react";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles
import Map from "./Map";

import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { getDashboard } from "../../requests";

function MapContainer() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  const fetchInfo = async () => {
    const res = await getDashboard();
    setUser(res.data);
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  const filterMarkers = (markers, category) => {
    if (markers) {
      if (category) {
        setFilteredMarkers(
          markers.filter((marker) => {
            return marker.languages.some(
              (language) => language.name === category
            );
          })
        );
      } else {
        setFilteredMarkers(markers);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
        filterMarkers={filterMarkers}
        markers={markers}
        user={user}
        setUser={setUser}
        setMarkers={setMarkers}
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
          user={user}
          setUser={setUser}
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
