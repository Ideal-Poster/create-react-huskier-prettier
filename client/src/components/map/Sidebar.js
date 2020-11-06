import React, { useState } from "react";
import { motion } from "framer-motion";

import "./Sidebar.css";

function Sidebar(props) {
  const { markers, panTo } = props;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      id="sidebar"
      variants={containerAnimation()}
      initial="hidden"
      whileHover="show"
      animate={isOpen ? "hidden" : "show"}
    >
      {markers.map((marker) => (
        <div onMouseOver={() => panTo(marker)} className="sidebar__marker">
          <div className="sidebar__marker__container">hello</div>
        </div>
      ))}
    </motion.div>
  );
}

function containerAnimation() {
  return {
    hidden: {
      x: "-90%",
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.55,
      },
    },
    show: {
      x: "0%",
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.55,
      },
    },
  };
}

export default Sidebar;
