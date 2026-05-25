import axios from "axios";

const axiosClient = axios.create({
  timeout: 5000,
});

export default axiosClient;