import axios from "axios";

const serverURL = "https://toy-gallery.herokuapp.com/";

export default axios.create({
  baseURL: serverURL,
  headers: { "Content-type": "application/json" },
});
