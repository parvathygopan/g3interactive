import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, 
});

//Interceptor for handle the response
api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class BaseClient {
  //Get Method
  static async get(endpoint, { onSuccess, onFailed }) {
  await api.get(endpoint)
  .then((data) => onSuccess && onSuccess(data))
  .catch((error) => onFailed && onFailed(error));

  }

  //Post Method
  static async post(
    endpoint,
    payload,
    { onSuccess, onFailed, authentication }
  ) {
    await api
      .post(endpoint, payload)
      .then((data) => onSuccess && onSuccess(data))
      .catch((error) => onFailed && onFailed(error));
  }

  //put Method
  static async put(endpoint, payload, { onSuccess, onFailed }) {
    await api
      .put(endpoint, payload)
      .then((data) => onSuccess && onSuccess(data))
      .catch((error) => onFailed && onFailed(error));
  }

  //Delete Method
  static async delete(endpoint, { onSuccess, onFailed }) {
    await api
      .delete(endpoint)
      .then((data) => onSuccess && onSuccess(data))
      .catch((error) => onFailed && onFailed(error));
  }
}

export default BaseClient;
