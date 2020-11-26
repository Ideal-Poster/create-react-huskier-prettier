import React, { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";

import HoverEffect from "./HoverEffect";
import { getAddress } from "../../requests";

function Pin({
  mousePos,
  pinPos,
  setPinPos,
  pixelPos,
  setPixelPos,
  setIsPinShown,
  isPinHoverEffectShown,
  setIsPinHoverEffectShown,
}) {
  const [isPinEditOpen, setIsPinEditOpen] = useState(false);
  const [isPinDragging, setIsPinDragging] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAdress = async () => {
      const res = await getAddress(pinPos.lat, pinPos.lng);
      setAddress(res.data.results[0].formatted_address);
    };
    if (pinPos.lat && pinPos.lng) fetchAdress();
  }, [pinPos.lat, pinPos.lng]);

  const handlePosEvent = (event) => {
    if (event.latLng) {
      setPinPos({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const onDragStart = (event) => {
    setIsPinDragging(true);
    setAddress("");
  };

  const onDragEnd = async (event) => {
    handlePosEvent(event);
    setPixelPos({ x: event.pixel.x, y: event.pixel.y });
    setIsPinDragging(false);
  };

  const onMouseOver = async (e) => {
    if (!isPinHoverEffectShown) {
      setIsPinHoverEffectShown(true);
      setPixelPos({ x: e.pixel.x, y: e.pixel.y });
    }
  };

  return pinPos.lat && pinPos.lng ? (
    <>
      <HoverEffect
        mousePos={mousePos}
        pixelPos={pixelPos}
        pin={true}
        setPixelPos={setPixelPos}
        setIsPinShown={setIsPinShown}
        isPinDragging={isPinDragging}
        address={address}
        isPinHoverEffectShown={isPinHoverEffectShown}
        isPinEditOpen={isPinEditOpen}
        setIsPinEditOpen={setIsPinEditOpen}
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
        onMouseOver={onMouseOver}
      />
    </>
  ) : null;
}

export default Pin;
