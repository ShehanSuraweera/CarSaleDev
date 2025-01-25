import axios from "axios";

export default axios.create({
  baseURL: "https://sugar-heliotrope-mole.glitch.me",
  withCredentials: true,
});
