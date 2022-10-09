import axios from "axios ";

const API_PATHS = {
  // Auth
  login: "/CustomerPoints/CustomerLogin",
};

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: `http://102.37.102.247:5016`,
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer adas`,
  });
  return instance;
};

export default API_PATHS;
export { AxiosInstance };
