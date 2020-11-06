import React from "react";
import useMouse from "@react-hook/mouse-position";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles
import Map from "./Map";

import HoverEffect from "./HoverEffect";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

function MapContainer(props) {
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

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
      {/* <Sidebar markers={markers} panTo={panTo}/> */}
      {/* <motion.div
        className="map__div"
        variants={containerAnimation()}
        initial="hidden"
        animate="show"
        > */}

      <Map
        mapRef={mapRef}
        panTo={panTo}
        markers={markers}
        setMarkers={setMarkers}
        selectMarker={selectMarker}
        deselectMarker={deselectMarker}
      />
      {/* </motion.div> */}
    </div>
  );
}

function containerAnimation() {
  return {
    hidden: {
      width: "60vw",
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.55,
      },
    },
    show: {
      x: "100%",
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.55,
      },
    },
  };
}

export default MapContainer;
