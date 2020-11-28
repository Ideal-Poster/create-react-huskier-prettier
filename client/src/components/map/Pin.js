import React, { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";

import HoverEffect from "./HoverEffect";
import { getAddress } from "../../requests";
import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

const initialFormState = {
  name: "",
  description: "",
};

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
}) {
  const [isPinDragging, setIsPinDragging] = useState(false);
  const [address, setAddress] = useState("");
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => {
      const updatedState = { ...current, [name]: value };
      return updatedState;
    });
  };

  useEffect(() => {
    const fetchAdress = async () => {
      const res = await getAddress(pinPos.lat, pinPos.lng);
      setAddress(res.data.results[0].formatted_address);
    };
    if (pinPos.lat && pinPos.lng) {
      fetchAdress();
      setIsPinEditOpen(false);
    }
  }, [pinPos.lat, pinPos.lng]);

  useEffect(() => setIsPinHoverEffectShown(true), []);

  const handlePosEvent = (event) => {
    if (event.latLng) {
      setPinPos({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const onDragStart = (event) => {
    setIsPinDragging(true);
    setAddress("");
    setIsPinEditOpen(false);
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

  const EditForm = () => (
    <form>
      <div>
        <label htmlFor="fname">Name:</label>
        <br />
        <input
          value={form.name}
          onChange={handleChange}
          type="text"
          id={styles.edit__form__name}
          name="name"
        />
      </div>

      <div>
        <label htmlFor="lname">description:</label>
        <br />
        <textarea
          value={form.description}
          onChange={handleChange}
          type="text"
          id={styles.edit__form__description}
          name="description"
        />
      </div>
    </form>
  );

  const PinContent = () => (
    <div>
      <div>
        <p>{address}</p>
      </div>

      {isPinEditOpen && (
        <div>
          <EditForm />
        </div>
      )}

      <div>
        <div className={styles.button}>
          <p
            onClick={() => {
              setIsPinEditOpen(true);
              // console.log(pinPos);
              panTo(pinPos);
            }}
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
