import axios from "axios";
import { BASE_URL, TIMEOUT } from "../config/api.config";
import { AuthActions, getAccessToken } from "../redux/slices/Auth.slice";
import { store } from "../redux/store.redux";
import { toast } from "react-toastify";



const http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true
});

const httpPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});


httpPrivate.interceptors.request.use(function (config) {
  const accessToken = getAccessToken(store.getState())
  if (accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

httpPrivate.interceptors.response.use(
  response => response,
  async error => {
    const appDispatch = store.dispatch
    const originalRequest = error.config
    const errorCode = error.response.status
    if (errorCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      // eslint-disable-next-line no-useless-catch
      try {
        const accessToken = await HTTP.post("/auth/refresh").then(({ data }) => {
          appDispatch(AuthActions.setLogin({ username: data.username, accessToken: data.accessToken }))
          return data.accessToken
        })
        error.config.headers["Authorization"] = `Bearer ${accessToken}`
        return httpPrivate(originalRequest)
      } catch (refreshError) {
        throw refreshError;
      }
    }
    else if (errorCode === 403)
      window.location.href = "/login"
    else if (errorCode === 404)
      console.log('Error code: 404, Not Found')
    else {
      console.log('Uknown Error')
    }
    return Promise.reject(error);

  });
export const HTTPPrivate = {
  get: httpPrivate.get,
  post: httpPrivate.post,
  delete: httpPrivate.delete,
  put: httpPrivate.put
}


export const HTTP = {
  get: http.get,
  post: http.post,
  delete: http.delete,
  put: http.put
} 