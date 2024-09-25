import axios from "axios"
import { resetLogin } from "../modules/auth/utils/authHelper";
import { BASE_URL, HttpResponse } from "../constants/api";
import { LOGIN_ROUTE } from "../modules/auth/constants/routes";
import toastFactory from "../utility/factories/toastFactory";
import authStorageKeys from "../modules/auth/constants/authStorageKeys";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem(authStorageKeys.TOKEN)}`
  }
})

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.withXSRFToken = true

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {

    if (error.code == 'ERR_CANCELED') {
      return Promise.reject(error)
    }
    const data = error,
      errorCode = data.code,
      message = data.message;

    toastFactory.dismiss()

    if (errorCode === HttpResponse.UN_AUTHENTICATED) {
      toastFactory.error(message)
      resetLogin()

      if (window.location.pathname !== LOGIN_ROUTE) {
        window.location.replace(LOGIN_ROUTE)
      }

    } else if (errorCode !== HttpResponse.VALIDATION_ERRORS) {
      toastFactory.error(message)
    }

    return Promise.reject(error);
  })

export default axiosInstance