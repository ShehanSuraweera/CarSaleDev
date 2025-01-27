import axios from "axios";

export default axios.create({
  baseURL: "https://ceyloncars.azurewebsites.net",
  withCredentials: true,
});
