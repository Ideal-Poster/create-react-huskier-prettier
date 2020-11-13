import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";

import { debounce } from "../../utils";

function Pin({ pinPos, setPinPos }) {
  // const [pinPos, setPinPos] = useState({});
  const [isPinDragging, setIsPinDragging] = useState(false);

  console.log("hello");

  const handlePosEvent = (event) => {
    console.log(event);

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
    console.log("goodbye");
    handlePosEvent(event);
    // setIsPinDragging(false);
  };

  return pinPos.lat && pinPos.lng ? (
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
  ) : null;
}

export default Pin;
