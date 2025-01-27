import axios from "axios";

// Check if we're in the browser or on the server
const isLocal =
  typeof window !== "undefined" && window.location.hostname === "localhost";
const baseURL = isLocal
  ? "http://localhost:4001"
  : "https://ceyloncars.azurewebsites.net";

export default axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
