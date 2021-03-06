import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    Authorization: localStorage.token || "",
  },
});

const proxy = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3080",
  timeout: 10000,
  // headers: {
  //   Authorization: localStorage.token || "",
  // },
});

export const signUp = async ({ username, password }) => {
  try {
    const res = await api.post("/signup", { user: { username, password } });
    if (res.data.errors) {
      console.log(res);
      return res.data;
    } else {
      console.log(res);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ username, password }) => {
  try {
    const res = await api.post("/login", { user: { username, password } });
    if (res.data.errors) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const autoLogin = async () => {
  const token = localStorage.token;
  if (token) {
    try {
      const res = await api.get("/auto_login");
      if (res.data.errors) {
        alert(res.data.errors);
        return res;
      } else {
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLocations = async () => {
  try {
    const res = await api.get("/friends/locations");
    if (res.data.errors) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDashboard = async () => {
  try {
    const res = await api.get("/dashboard");
    if (res.data.errors) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAddress = async (lat, lng) => {
  let config = {
    headers: { lat, lng },
  };
  try {
    const res = await proxy.get("/api", config);
    if (res.data.errors) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const postLocation = async (form) => {
  try {
    const res = await api.post("/locations", form);
    if (res.data.errors) {
      console.log(res);
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const inviteFriend = async (friendName) => {
  try {
    const res = await api.post("/friend", { friend: friendName });
    if (res.data.errors) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const visitLocation = async ({ id }) => {
  try {
    const res = await api.post("/visits", { location: id });
    if (res.data.errors) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFriend = async (user) => {
  try {
    const res = await api.delete("/friend", {
      data: { user: user },
    });
    if (res.data.errors) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const confirmFriend = async (user) => {
  try {
    const res = await api.post("/friend/confirm", { user: user });
    if (res.data.errors) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
