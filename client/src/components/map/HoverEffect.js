import React from "react";
import { motion } from "framer-motion";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

function HoverEffect(props) {
  const { mouse, marker } = props;
  return (
    <div>
      <motion.div
        className={styles.hover__position}
        animate={{ x: mouse.x + 25, y: mouse.y - 175 }}
        transition={{ duration: 0 }}
      >
        <motion.div
          className={styles.hover__container}
          animate={{ width: "100%" }}
          transition={{ duration: 0.2 }}
        >
          <motion.div className={styles.hover__content}>{marker.id}</motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HoverEffect;
