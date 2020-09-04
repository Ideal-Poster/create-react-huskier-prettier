import React from "react";
import { motion } from "framer-motion";

import styles from "./MapContainer.module.css"; // Import css modules stylesheet as styles

function HoverEffect(props) {
  const { mouse } = props;
  const [isDisplayed, setIsDisplayed] = React.useState(false);

  return (
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
        <motion.div
          className={styles.hover__content}
          // animate={{ x: 1 }}
          // transition={{ duration: 2 }}
        >
          <p>hehehe</p>s
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HoverEffect;
