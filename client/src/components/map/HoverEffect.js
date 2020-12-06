import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

function HoverEffect({
  mousePos,
  selectedMarker,
  pixelPos,
  pin,
  hoveredMarker,
  isPinDragging,
  isPinHoverEffectShown,
  PinContent,
  mapRef,
}) {
  const displayPosition = () => {
    if (pin) {
      return {
        x: mapRef.current.__gm.pixelBounds.Ka * -1 + pixelPos.x - 100,
        y: window.innerHeight / 2 + pixelPos.y - 200,
        opacity: 1,
        width: "200px",
        height: "150px",
        transition: {
          duration: 0,
        },
      };
      // }
    } else {
      return {
        x: mousePos.x - 135,
        y: mousePos.y - 250,
        opacity: 1,
        transition: {
          duration: 0,
        },
      };
    }
  };

  const isEffectDisplayed = () => {
    if (!pin) {
      return hoveredMarker && hoveredMarker.id && !selectedMarker;
    } else {
      return pin && !isPinDragging && isPinHoverEffectShown;
    }
  };

  const HoverContent = () => {
    const { address, name, description } = hoveredMarker;
    return (
      <div>
        <p>{name}</p>
        <p>{address}</p>
        <p>
          {description.length > 110
            ? description.slice(0, 110) + "..."
            : description}
        </p>
      </div>
    );
  };

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
              {pin ? <PinContent /> : <HoverContent />}
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
