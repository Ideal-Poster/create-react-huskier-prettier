import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 5000,
  headers: {
    Authorization: localStorage.token || "",
  },
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
        console.log(res);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default api;
