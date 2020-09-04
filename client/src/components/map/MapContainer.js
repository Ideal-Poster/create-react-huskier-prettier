import React from "react";
import useMouse from "@react-hook/mouse-position";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles
import Map from "./Map";
import HoverEffect from "./HoverEffect";

function MapContainer(props) {
  const [selected, setSelected] = React.useState(null);
  const [selectedQueue, setSelectedQueue] = React.useState([]);

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const filterMarkers = (state, marker) => {
    return state.filter((currentMarker) => currentMarker.pixel != marker.pixel);
  };

  const selectMarker = (marker) => {
    setSelectedQueue((current) => [...current, marker]);
    setSelected(marker);
  };

  const deselectMarker = (marker) => {
    setSelectedQueue((current) => filterMarkers(current, marker));
  };

  return (
    <div className={styles.container} ref={ref}>
      {selectedQueue.map(() => (
        <HoverEffect mouse={mouse} />
      ))}
      <Map selectMarker={selectMarker} deselectMarker={deselectMarker} />
    </div>
  );
}

export default MapContainer;
