import React, { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";

import HoverEffect from "./HoverEffect";
import { getAddress, postLocation } from "../../requests";
import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

function Pin({
  mousePos,
  pinPos,
  setPinPos,
  pixelPos,
  setPixelPos,
  setIsPinShown,
  isPinHoverEffectShown,
  setIsPinHoverEffectShown,
  isPinEditOpen,
  setIsPinEditOpen,
  panTo,
  mapRef,
  setSelectedMarker,
  address,
  setAddress,
}) {
  const [isPinDragging, setIsPinDragging] = useState(false);

  useEffect(() => {
    const fetchAdress = async () => {
      const res = await getAddress(pinPos.lat, pinPos.lng);
      setAddress(res.data.results[0].formatted_address);
    };
    if (pinPos.lat && pinPos.lng) {
      fetchAdress();
      // setIsPinEditOpen(false);
    }
  }, [pinPos.lat, pinPos.lng]);

  useEffect(() => setIsPinHoverEffectShown(true), []);

  // useEffect(() => {
  //   setIsPinHoverEffectShown(false)
  // }, [isSidebarOpen])

  const handlePosEvent = (event) => {
    if (event.latLng) {
      setPinPos({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const onDragStart = (event) => {
    setIsPinDragging(true);
    setAddress("");
    // setIsPinEditOpen(false);
  };

  const onDragEnd = async (event) => {
    handlePosEvent(event);
    setPixelPos({ x: event.pixel.x, y: event.pixel.y });
    setIsPinDragging(false);
  };

  const onMouseOver = async (e) => {
    if (!isPinHoverEffectShown) {
      setIsPinHoverEffectShown(true);
      setPixelPos(e.pixel);
    }
  };

  const PinContent = () => (
    <div>
      <div>
        <p>{address}</p>
        <div className={styles.button}>
          <p
            onClick={() =>
              setSelectedMarker((current) => {
                const updatedState = {
                  ...current,
                  lat: pinPos.lat,
                  lng: pinPos.lng,
                };
                return updatedState;
              })
            }
          >
            add marker
          </p>
        </div>

        <div
          className={styles.button}
          style={{ marginLeft: "5%", position: "relative" }}
        >
          <p onClick={() => setIsPinShown(false)}>remove pin</p>
        </div>
      </div>
    </div>
  );

  return pinPos.lat && pinPos.lng ? (
    <>
      <HoverEffect
        mousePos={mousePos}
        pixelPos={pixelPos}
        pin={true}
        setPixelPos={setPixelPos}
        isPinDragging={isPinDragging}
        isPinHoverEffectShown={isPinHoverEffectShown}
        isPinEditOpen={isPinEditOpen}
        PinContent={PinContent}
        mapRef={mapRef}
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
