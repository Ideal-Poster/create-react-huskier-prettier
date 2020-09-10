import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: 5000,
  // headers: {
  //     Authorization: ''
  // }
});

export const postUser = ({ name, password }) => {
  api.get({ name, password }).then(console.log);
};

export default api;
