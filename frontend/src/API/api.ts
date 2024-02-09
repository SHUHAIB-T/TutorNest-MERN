import axios from "axios";

const baseURL = "http://localhost:5000/api";

const axios_instance = axios.create({
  baseURL,
});

export default axios_instance;
