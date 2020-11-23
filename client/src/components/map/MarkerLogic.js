import React from "react";
import { Marker } from "@react-google-maps/api";

function MarkerLogic({
  marker,
  hoveredMarker,
  setHoveredMarker,
  panTo,
  setSelectedMarker,
  selectedMarker,
  isPinShown,
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

  return (
    <Marker
      icon={{
        url: displayMarker(),
        scaledSize: new window.google.maps.Size(35, 35),
      }}
      key={`${marker.created_at}-${marker.id}`}
      position={{ lat: marker.lat, lng: marker.lng }}
      onClick={() => {
        setSelectedMarker(marker);
        // panTo(marker)
      }}
      onMouseOver={() => {
        // if (!isPinShown)
        setHoveredMarker(marker);
      }}
      onMouseOut={() => {
        setHoveredMarker(null);
      }}
    />
  );
}

export default MarkerLogic;
