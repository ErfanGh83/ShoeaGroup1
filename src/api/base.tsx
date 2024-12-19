import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5173/",
});

export default Api;