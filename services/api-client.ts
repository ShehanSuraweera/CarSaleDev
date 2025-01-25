import axios from "axios";

export default axios.create({
  baseURL: "https://16.171.138.132:4001",
  withCredentials: true,
});
