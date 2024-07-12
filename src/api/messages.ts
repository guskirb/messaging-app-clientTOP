import axios from "./axios";

export const getChatrooms = async () => {
  return axios
    .get("/chatrooms/all")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const createChatroom = async () => {
  return axios
    .post("/chatrooms/create")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const getMessages = async (id) => {
  return axios
    .get(`/chatrooms/${id}/messages`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const postMessage = async (id, data) => {
  return axios
    .post(`/chatrooms/${id}/messages`, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};
