import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";

function MarkerLogic(_props) {
  const [hover, setHover] = useState(false);
  const { props, marker } = _props;

  const displayMarker = () => {
    if (marker["my_location?"] && !hover) {
      return "Asset-3.svg";
    }
    if (marker["my_location?"] && hover) {
      return "Asset-5.svg";
    }
    if (!marker["my_location?"] && !hover) {
      return "Asset-12.svg";
    }
    if (!marker["my_location?"] && hover) {
      return "Asset-5.svg";
    }
  };

  return (
    <Marker
      icon={{
        url: displayMarker(),
        scaledSize: new window.google.maps.Size(35, 35),
      }}
      key={`${marker.created_at}-${marker.id}`}
      position={{ lat: marker.lat, lng: marker.lng }}
      onMouseOver={() => {
        setHover((current) => !current);
        props.selectMarker(marker);
      }}
      onMouseOut={() => {
        props.deselectMarker(marker);
        setHover((current) => !current);
      }}
    />
  );
}

export default MarkerLogic;
