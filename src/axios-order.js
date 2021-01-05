import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-22.firebaseio.com/",
});

export default instance;
