import React from "react";
import { Marker } from "@react-google-maps/api";

function MarkerLogic(_props) {
  const { props, marker, selectedMarker } = _props;

  const isMarkerActive = () => {
    return selectedMarker && selectedMarker.id === marker.id;
  };

  const displayMarker = () => {
    if (isMarkerActive()) {
      return "Asset-5.svg";
    }
    if (marker["my_location?"] && !isMarkerActive()) {
      return "Asset-3.svg";
    }
    if (!marker["my_location?"] && !isMarkerActive()) {
      return "Asset-12.svg";
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
        props.selectMarker(marker);
      }}
      onMouseOut={() => {
        props.deselectMarker(marker);
      }}
    />
  );
}

export default MarkerLogic;
