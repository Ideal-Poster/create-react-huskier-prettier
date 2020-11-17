import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

function HoverEffect({
  mousePos,
  selectedMarker,
  pixelPos,
  pin,
  hoveredMarker,
}) {
  const [isVisible, setIsVisable] = useState(false);

  return (
    <AnimatePresence>
      {/* {(hoveredMarker && hoveredMarker.id && isVisible) && ( */}

      {hoveredMarker && hoveredMarker.id && (
        <motion.div
          className={styles.hover__position}
          animate={{
            y: pin ? window.innerHeight / 2 + pixelPos.y : mousePos.y - 175,
            x: pin ? window.innerWidth / 2 + pixelPos.x : mousePos.x - 100,
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
            // style={{ originX: 1 }}
          >
            <motion.div className={styles.hover__content}>
              {hoveredMarker.id}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// const containerAnimation = {
//   hidden: {
//     width: "100vw",
//     transition: {
//       ease: [0.16, 1, 0.3, 1],
//       duration: 0.55,
//     },
//   },
//   show: {
//     width: "60vw",
//     transition: {
//       ease: [0.16, 1, 0.3, 1],
//       duration: 0.55,
//     },
//   },
// };

const hidingAnimation = {
  hidden: {
    width: "0%",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
  show: {
    width: "100%",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.2,
    },
  },
};

export default HoverEffect;
