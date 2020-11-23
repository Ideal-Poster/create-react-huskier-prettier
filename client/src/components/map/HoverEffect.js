import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

function HoverEffect({
  mousePos,
  selectedMarker,
  pixelPos,
  pin,
  hoveredMarker,
  setIsPinShown,
  isPinDragging,
  setSelectedMarker,
}) {
  console.log(hoveredMarker);

  const displayPosition = () => {
    if (pin) {
      return {
        x: window.innerWidth / 2 + pixelPos.x - 100,
        y: window.innerHeight / 2 + pixelPos.y - 200,
        opacity: 1,
      };
    } else {
      return {
        x: mousePos.x - 100,
        y: mousePos.y - 200,
        opacity: 1,
      };
    }
  };

  const isEffectDisplayed = () =>
    ((hoveredMarker && hoveredMarker.id) || (pin && !isPinDragging)) &&
    !selectedMarker;

  return (
    <AnimatePresence>
      {isEffectDisplayed() && (
        <motion.div
          className={styles.hover__position}
          animate={displayPosition()}
          transition={{ duration: 0 }}
        >
          <motion.div
            initial={"hidden"}
            className={styles.hover__container}
            animate={"show"}
            transition={{ duration: 0.2 }}
            variants={displayAnimation}
            exit={"exit"}
          >
            <motion.div className={styles.hover__content}>
              {/* {hoveredMarker.id} */}

              {pin && <p onClick={() => setIsPinShown(false)}>remove pin</p>}

              <p onClick={() => setSelectedMarker(null)}>closed</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const displayAnimation = {
  hidden: {
    width: "0%",
    // scaleX: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.4,
    },
  },
  show: {
    width: "100%",
    // scaleX: 1,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.4,
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.15,
    },
  },
};

export default HoverEffect;
