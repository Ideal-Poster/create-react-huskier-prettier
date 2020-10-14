import React from "react";
import useMouse from "@react-hook/mouse-position";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles
import Map from "./Map";

import HoverEffect from "./HoverEffect";

function MapContainer(props) {
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const selectMarker = (marker) => {
    console.log(marker);
    setSelectedMarker(marker);
  };

  const deselectMarker = (marker) => {
    setSelectedMarker(null);
  };

  return (
    <div className={styles.container} ref={ref}>
      {selectedMarker && <HoverEffect mouse={mouse} marker={selectedMarker} />}

      <Map
        markers={markers}
        setMarkers={setMarkers}
        selectMarker={selectMarker}
        deselectMarker={deselectMarker}
      />
    </div>
  );
}

export default MapContainer;
