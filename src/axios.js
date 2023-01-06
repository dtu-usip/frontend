import axios from "axios";
import { API_URL } from "./constants";
import {
  clearAuthToken,
  getRefreshToken,
  setAccessToken,
} from "./utilities/Cookies";

const instance = axios.create({
  timeout: 15000,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    token: localStorage.getItem("access"),
  },
});

instance.interceptors.request.use(
  async (request) => {
    return request;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === API_URL + "/refreshToken"
    ) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

          // exp date in token is expressed in seconds, while now() returns milliseconds:
          const now = Math.ceil(Date.now() / 1000);

          if (tokenParts.exp > now) {
            return instance
              .get(API_URL + "/refreshToken", {
                headers: {
                  token: refreshToken,
                },
              })
              .then((response) => {
                // console.log('Refresh token success', response);
                setAccessToken(response.data.access);
                instance.defaults.headers.common["token"] =
                  response.data.access;
                originalRequest.headers["token"] = response.data.access;

                return instance(originalRequest);
              })
              .catch((err) => {
                console.log("Error", err);
              });
          } else {
            clearAuthToken();
            axios.defaults.headers.common["token"] = "";
            window.location.replace(window.location.origin);
          }
        } catch (e) {
          return Promise.reject(error);
        }
      } else {
        clearAuthToken();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
