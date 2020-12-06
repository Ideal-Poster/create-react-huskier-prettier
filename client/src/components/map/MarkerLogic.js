import React from "react";
import { Marker } from "@react-google-maps/api";

function MarkerLogic({
  marker,
  hoveredMarker,
  setHoveredMarker,
  setSelectedMarker,
  selectedMarker,
  setIsPinShown,
  setAddress,
}) {
  const isMarkerActive = () => hoveredMarker && hoveredMarker.id === marker.id;

  const isMarkerSelected = () =>
    selectedMarker && selectedMarker.id === marker.id;

  const displayMarker = () => {
    if (isMarkerActive() || isMarkerSelected()) {
      return "Asset-8.svg";
    }
    if (marker["my_location?"] && !isMarkerActive()) {
      return "Asset-3.svg";
    }
    if (!marker["my_location?"] && !isMarkerActive()) {
      return "Asset-12.svg";
    }
  };
  const onClick = () => {
    // find better fix for this
    setTimeout(() => {
      setSelectedMarker(marker);
    }, 100);
    setAddress("");
    setIsPinShown(false);
  };

  return (
    <Marker
      icon={{
        url: displayMarker(),
        scaledSize: new window.google.maps.Size(35, 35),
      }}
      key={`${marker.created_at}-${marker.id}`}
      position={{ lat: marker.lat, lng: marker.lng }}
      onClick={onClick}
      onMouseOver={() => {
        setHoveredMarker(marker);
      }}
      onMouseOut={() => {
        setHoveredMarker(null);
      }}
    />
  );
}

export default MarkerLogic;
