import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";

import { debounce } from "../../utils";
import HoverEffect from "./HoverEffect";

function Pin({ mousePos, pinPos, setPinPos }) {
  const [isPinDragging, setIsPinDragging] = useState(false);
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 });

  const handlePosEvent = (event) => {
    if (event.latLng) {
      setPinPos({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const onDragStart = (event) => {
    console.log("hwllo");
    handlePosEvent(event);
    // setIsPinDragging(true);
  };

  const onDragEnd = (event) => {
    console.log(event);
    handlePosEvent(event);
    // setIsPinDragging(false);
    setPixelPos({ x: event.pixel.x, y: event.pixel.y });
  };

  return pinPos.lat && pinPos.lng ? (
    <>
      <HoverEffect
        mousePos={mousePos}
        pixelPos={pixelPos}
        setPixelPos={setPixelPos}
        pin={true}
      />
      <Marker
        draggable={true}
        icon={{
          url: "Asset-15.svg",
          scaledSize: new window.google.maps.Size(35, 35),
        }}
        position={{ lat: pinPos.lat, lng: pinPos.lng }}
        // onDragStart={onDragStart}
        // onVisibleChanged={console.log('cursorchanged')}
        onDragEnd={onDragEnd}
        // ondrag={debounce(handlePosEvent(), 50)}
      />
    </>
  ) : null;
}

export default Pin;
