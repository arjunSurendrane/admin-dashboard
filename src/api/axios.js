import axios from "axios";

export const url = "https://mavens-api.onrender.com/api/v1";

const instance = axios.create({
  baseURL: url,
});

export default instance;
