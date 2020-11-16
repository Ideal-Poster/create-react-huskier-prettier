import React, { useState } from "react";
import { motion } from "framer-motion";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

function HoverEffect({ mousePos, selectedMarker, pixelPos, pin }) {
  console.log("mouse", mousePos.y);
  // if (condition) {}
  // let pixelPos = 0;

  return (
    <div>
      <motion.div
        className={styles.hover__position}
        animate={{
          // x: mousePos.x + 25,
          // y: mousePos.y - 175,
          y: pin ? window.innerHeight / 2 + pixelPos.y : mousePos.y - 175,
          x: pin ? window.innerWidth / 2 + pixelPos.x : mousePos.x + 25,
          height: selectedMarker ? "100vh" : "105",
        }}
        transition={{ duration: 0 }}
      >
        <motion.div
          className={styles.hover__container}
          animate={{ width: "100%" }}
          transition={{ duration: 0.2 }}
        >
          <motion.div className={styles.hover__content}>hello</motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const containerAnimation = {
  hidden: {
    width: "100vw",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
  show: {
    width: "60vw",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
};

export default HoverEffect;
