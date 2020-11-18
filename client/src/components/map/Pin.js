import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";

import HoverEffect from "./HoverEffect";

function Pin({
  mousePos,
  pinPos,
  setPinPos,
  pixelPos,
  setPixelPos,
  setIsPinShown,
}) {
  const [isPinDragging, setIsPinDragging] = useState(false);
  const [isHoverHidden, setIsHoverHidden] = useState(false);

  const handlePosEvent = (event) => {
    if (event.latLng) {
      setPinPos({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const onDragStart = (event) => {
    handlePosEvent(event);
    setIsPinDragging(true);
    setIsHoverHidden(true);
  };

  const onDragEnd = (event) => {
    handlePosEvent(event);
    setPixelPos({ x: event.pixel.x, y: event.pixel.y });
    setIsPinDragging(false);
    setIsHoverHidden(false);
  };

  return pinPos.lat && pinPos.lng ? (
    <>
      <HoverEffect
        mousePos={mousePos}
        pixelPos={pixelPos}
        setPixelPos={setPixelPos}
        pin={true}
        isHoverHidden={isHoverHidden}
        setIsPinShown={setIsPinShown}
      />
      <Marker
        draggable={true}
        icon={{
          url: "Asset-15.svg",
          scaledSize: new window.google.maps.Size(35, 35),
        }}
        position={{ lat: pinPos.lat, lng: pinPos.lng }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    </>
  ) : null;
}

export default Pin;
