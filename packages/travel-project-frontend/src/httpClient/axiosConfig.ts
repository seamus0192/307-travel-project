import axios from "axios";

export const setAuthToken = (): void => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
