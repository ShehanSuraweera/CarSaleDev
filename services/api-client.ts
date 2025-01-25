import axios from "axios";

export default axios.create({
  baseURL: "http://16.171.138.132:4001",
  withCredentials: true,
});
