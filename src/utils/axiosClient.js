import axios from "axios";

const axiosClient = axios.create({
    baseURL: "/api/",
})

axiosClient.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
      let res = error.response;
      if (res.status === 401) {
        window.location.href = "https://localhost:8080/login";
      }
      console.error("Looks like there was a problem. Status Code: " + res.status);
      return Promise.reject(error);
    }
  );

export default axiosClient;