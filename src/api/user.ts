import axios from "./axios";
import moment from "moment";

import { FormFields } from "../pages/auth/login";

export const logIn = async (data: FormFields) => {
  return axios
    .post("/users/login", data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const getUser = async () => {
  return axios
    .get("/users/me")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const setLocalStorage = (response) => {
  const expires = moment().add(response.expires);

  localStorage.setItem("token", response.token);
  localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
};
