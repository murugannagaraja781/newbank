import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api", // backend server URL
});

// If using JWT later, we can add interceptors here
export default API;
