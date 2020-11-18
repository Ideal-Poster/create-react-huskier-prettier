import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

function HoverEffect({
  mousePos,
  selectedMarker,
  pixelPos,
  pin,
  hoveredMarker,
  isHoverEffectHidden,
  setIsPinShown,
}) {
  return (
    <AnimatePresence>
      {((hoveredMarker && hoveredMarker.id) ||
        (pin && !isHoverEffectHidden)) && (
        <motion.div
          className={styles.hover__position}
          animate={{
            y: pin
              ? window.innerHeight / 2 + pixelPos.y - 200
              : mousePos.y - 175,
            x: pin
              ? window.innerWidth / 2 + pixelPos.x - 100
              : mousePos.x - 100,
          }}
          transition={{ duration: 0 }}
        >
          <motion.div
            initial={"hidden"}
            className={styles.hover__container}
            animate={"show"}
            transition={{ duration: 0.2 }}
            variants={hidingAnimation}
            exit={"exit"}
          >
            <motion.div className={styles.hover__content}>
              {/* {hoveredMarker.id} */}

              {pin && <p onClick={() => setIsPinShown(false)}>remove pin</p>}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const hidingAnimation = {
  hidden: {
    width: "0%",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.4,
    },
  },
  show: {
    width: "100%",
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
