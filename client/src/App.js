import React, { useState } from "react";
import "./App.css";
import Map from "./components/map/Map";
import useMouse from "@react-hook/mouse-position";
import { Motion, spring } from "react-motion";

function App() {
  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });
  const [selected, setSelected] = React.useState(null);

  return (
    <div
      ref={ref}
      style={{
        background: "blue",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      {mouse.x && (
        <Motion
          defaultStyle={{
            x: 0,
            y: 0,
            width: 100,
            offset: 0,
          }}
          style={{
            x: mouse.x,
            y: mouse.y,
            width: spring(0),
            offset: spring(100),
          }}
        >
          {(style) => (
            <div
              className="hover__container"
              style={{
                transform: `translate(${style.x}px, ${style.y}px)`,
                zIndex: 99,
              }}
            >
              <div
                className="overlay"
                style={{
                  transform: `translateX(-${style.width}%)`,
                }}
              >
                <div
                  style={{
                    background: "green",
                    position: "relative",
                    transform: `translateX(-${style.offset}%)`,
                  }}
                >
                  helloopfonrpfnoepro
                  {style.scaleX}
                </div>
              </div>
            </div>
          )}
        </Motion>
      )}
      <Map setSelected={setSelected} />
    </div>
  );
}

export default App;
