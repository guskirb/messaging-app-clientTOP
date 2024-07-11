import axios from "./axios";
import moment from "moment";

import { FormFields } from "../pages/auth/login";

export const logIn = async (data: FormFields) => {
  return axios
    .post("/users/login", data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const registerUser = async (data: FormFields) => {
  return axios
    .post("/users/register", data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const getAllUsers = async () => {
  return axios
    .get("/users")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const getUser = async (id) => {
  return axios
    .get(`/users/${id}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const getSelf = async () => {
  return axios
    .get("/users/me")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const getFriends = async () => {
  return axios
    .get("/users/friends")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const setLocalStorage = (response) => {
  const expires = moment().add(response.expires);

  localStorage.setItem("token", response.token);
  localStorage.setItem("expires", JSON.stringify(expires.valueOf()));
};
