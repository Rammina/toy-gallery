import axios from "axios";

const serverURL = "https://toy-gallery.herokuapp.com/api";

export default axios.create({
  baseURL: serverURL,
});
