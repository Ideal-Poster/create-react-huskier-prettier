import React, { useState, useEffect } from "react";
import useMouse from "@react-hook/mouse-position";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles
import Map from "./Map";

import HoverEffect from "./HoverEffect";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

function MapContainer(props) {
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [width, setWidth] = useState("100vw");

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  useEffect(() => {
    console.log("hello");
    isSidebarOpen ? setWidth("60vw") : setWidth("100vw");
  }, [isSidebarOpen]);

  const selectMarker = (marker) => {
    setSelectedMarker(marker);
  };

  const deselectMarker = (marker) => {
    setSelectedMarker(null);
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
        markers={markers}
        panTo={panTo}
      />
      <motion.div
        className="map__div"
        variants={containerAnimation}
        initial="hidden"
        animate={isSidebarOpen ? "show" : "hidden"}
      >
        <Map
          width={width}
          mapRef={mapRef}
          panTo={panTo}
          markers={markers}
          setMarkers={setMarkers}
          selectMarker={selectMarker}
          deselectMarker={deselectMarker}
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
