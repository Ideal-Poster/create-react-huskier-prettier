import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./Sidebar.css";
import { getDashboard } from "../../requests";

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  filterMarkers,
  markers,
  user,
  setUser,
}) {
  const fetchInfo = async () => {
    const res = await getDashboard();
    console.log(res);
    setUser(res.data);
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <motion.div
        id="sidebar"
        variants={sidebarAnimation}
        initial="hidden"
        animate={isSidebarOpen ? "show" : "hidden"}
      >
        <motion.div
          variants={sidebarContentsAnimation}
          initial="hidden"
          animate={isSidebarOpen ? "show" : "hidden"}
        >
          {user && (
            <div className="sidebar__container">
              <div>
                <h1>{user.username}</h1>
                <ul>
                  <li>visits {user.visits.length}</li>
                  <li>
                    last visit:{" "}
                    {user.visits.sort((a, b) => b.id - a.id)[0].location.name}
                  </li>
                </ul>
              </div>

              <div>
                <h1>Languages</h1>
                <ul>
                  {user.languages.map((language) => (
                    <li
                      key={`language-${language.name}`}
                      onClick={() => filterMarkers(markers, language.name)}
                    >
                      {language.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h1>Friends</h1>
                <ul>
                  {user.friends.map((friend) => (
                    <li key={`username-${friend.username}`}>
                      {" "}
                      {friend.username}{" "}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
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

const sidebarContentsAnimation = {
  hidden: {
    x: `100%`,
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
    x: "33.3vw",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.55,
    },
  },
};

export default Sidebar;
