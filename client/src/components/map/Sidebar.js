import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./Sidebar.css";
import {
  getDashboard,
  inviteFriend,
  deleteFriend,
  getLocations,
} from "../../requests";

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  filterMarkers,
  markers,
  user,
  setUser,
  setMarkers,
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [userSearch, setUserSearch] = useState("");
  const [searchPlacerholder, setsearchPlacerholder] = useState("Add Friend");

  const fetchInfo = async () => {
    const res = await getDashboard();
    setUser(res.data);
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    filterMarkers(markers, selectedLanguage);
  }, [selectedLanguage]);

  const languageOnClick = (language) => {
    selectedLanguage === language.name
      ? setSelectedLanguage(null)
      : setSelectedLanguage(language.name);
  };

  const updateUserFriends = async (user) => {
    const deletedFriend = (await deleteFriend(user)).data;

    setUser((current) => {
      let updatedUser = current;
      const updatedFriends = current.friends.filter(
        (friend) => friend.username !== deletedFriend.username
      );
      console.log(updatedFriends);
      updatedUser.friends = updatedFriends;
      return updatedUser;
    });
  };

  const deleteUserOnClick = async (user) => {
    if (window.confirm("Are you sure?")) {
      updateUserFriends(user);
      const res = await getLocations();
      setMarkers(res.data);
    }
  };

  const onChange = (e) => {
    setUserSearch(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await inviteFriend(userSearch);
    if (res.data.errors) {
      setUserSearch("");
      setsearchPlacerholder(res.data.errors);
      setTimeout(() => {
        setsearchPlacerholder("Add Friend");
      }, 5000);
    } else {
      setUserSearch("");
      setsearchPlacerholder("Invite Sent");
      setTimeout(() => {
        setsearchPlacerholder("Add Friend");
      }, 5000);
    }
  };

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
                      className={`sidebar__language ${
                        selectedLanguage === language.name
                          ? "sidebar__language__selected"
                          : null
                      }`}
                      key={`language-${language.name}`}
                      onClick={(e) => languageOnClick(language)}
                    >
                      {language.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h1>Friends</h1>
                <div className="friends__list">
                  <form
                    onSubmit={onSubmit}
                    style={{ paddingLeft: "40px", paddingBottom: "10px" }}
                  >
                    <input
                      type="text"
                      placeholder={searchPlacerholder}
                      value={userSearch}
                      onChange={onChange}
                    />
                  </form>
                  <ul>
                    {user.pending_friends.length > 0 &&
                      user.pending_friends.map((friend) => (
                        <li key={friend.username}>{friend.username}</li>
                      ))}
                    {user.friends.map((friend) => (
                      <li key={`username-${friend.username}`}>
                        {" "}
                        {friend.username}{" "}
                        <span
                          className="minus"
                          onClick={() => deleteUserOnClick(friend)}
                        >
                          ➖
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
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
