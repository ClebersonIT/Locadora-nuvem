import axios from "axios";

export const api = axios.create({
  baseURL: "https://parseapi.back4app.com/classes",
  timeout: 1000 * 5,
  headers: {
    "X-Parse-Application-Id": "89Q6qi2xZMfxfbTM4ifY52FhauYaQHdb8U9Vq81l",
    "X-Parse-REST-API-Key": "Qg8l7yFbkFNxVjGH1E8gi7Zd4BLkOo6rfxPskprr",
  },
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    if (response?.data?.results) {
      return response.data.results;
    } else {
      return response?.data;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);
