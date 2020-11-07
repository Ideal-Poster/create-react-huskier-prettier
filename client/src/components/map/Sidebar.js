import React, { useState } from "react";
import { motion } from "framer-motion";

import "./Sidebar.css";

function Sidebar(props) {
  const { markers, panTo, isSidebarOpen, setIsSidebarOpen } = props;

  return (
    <div>
      <motion.div
        id="sidebar"
        variants={sidebarAnimation}
        initial="hidden"
        // onMouseOver={() => setIsSidebarOpen(true)}
        // onMouseOut={() => setIsSidebarOpen(false)}
        animate={isSidebarOpen ? "show" : "hidden"}
      >
        {markers.map((marker) => (
          <div
            key={marker.id}
            onMouseOver={() => panTo(marker)}
            className="sidebar__marker"
          >
            <div className="sidebar__marker__container">hello</div>
          </div>
        ))}
      </motion.div>
      <motion.div
        id="sidebar__button"
        initial="hidden"
        variants={buttonAnimation}
        onClick={() => setIsSidebarOpen((current) => !current)}
        animate={isSidebarOpen ? "open" : "closed"}
      />
    </div>
  );
}

const sidebarAnimation = {
  hidden: {
    x: "-100%",
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

const buttonAnimation = {
  closed: {
    x: "0",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
  open: {
    x: "40vw",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
};

export default Sidebar;
