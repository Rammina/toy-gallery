import axios from "axios";

const serverURL = "http://localhost:5000/api";

export default axios.create({
  baseURL: serverURL,
});
