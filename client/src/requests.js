import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 5000,
  headers: {
    Authorization: localStorage.user_id || "",
  },
});

export const signUp = async ({ username, password }) => {
  try {
    const res = await api.post("/signup", { user: { username, password } });
    if (res.data.errors) {
      alert(res.data.errors);
    } else {
      console.log("success");
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ username, password }) => {
  try {
    const res = await api.post("/login", { user: { username, password } });
    if (res.data.errors) {
      alert(res.data.errors);
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const autoLogin = async () => {
  const userId = localStorage.user_id;
  if (userId) {
    try {
      const res = await api.get("/auto_login");
      if (res.data.errors) {
        alert(res.data.errors);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default api;
