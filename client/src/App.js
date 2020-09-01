import React, { useState } from "react";
import "./App.css";
import Map from "./components/map/Map";
import useMouse from "@react-hook/mouse-position";
import { Motion, spring } from "react-motion";

function App() {
  const [selected, setSelected] = React.useState(null);
  const [selectedQueue, setSelectedQueue] = React.useState([]);

  const ref = React.useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  const selectMarker = (marker) => {
    setSelectedQueue((current) => [...current, marker]);
    setSelected(marker);
  };

  const deselectMarker = (marker) => {
    setSelectedQueue((current) =>
      current.filter((currentMarker) => currentMarker == marker)
    );
  };

  return (
    <div
      ref={ref}
      style={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      {mouse.x && selectedQueue.includes(selected) && (
        <Motion
          defaultStyle={{
            x: 0,
            y: 0,
            // width: 0
          }}
          style={{
            x: mouse.x,
            y: mouse.y,
            // width: spring(100, {stiffness: 300})
          }}
          // onFinish={console.log('hello')}
        >
          {(posStyle) => (
            <Motion
              defaultStyle={{ width: 0 }}
              style={{ width: spring(100, { stiffness: 300 }) }}
            >
              {(style) => (
                <div>
                  {selectedQueue.map((marker, i) => (
                    <div
                      key={i}
                      className="hover__container"
                      style={{
                        transform: `translate(${posStyle.x}px, ${posStyle.y}px)`,
                        zIndex: 99,
                      }}
                    >
                      <div
                        className="overlay"
                        style={{
                          background: "green",
                          // transform: `translateX(-${style.width}%)`,
                          width: `${style.width}%`,
                        }}
                      >
                        <div
                          style={{
                            background: "green",
                            position: "relative",
                            // transform: `translateX(-${style.offset}%)`,
                          }}
                        >
                          {i} - helloopfonrpfnoepro
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Motion>
          )}
        </Motion>
      )}
      <Map selectMarker={selectMarker} deselectMarker={deselectMarker} />
    </div>
  );
}

export default App;
