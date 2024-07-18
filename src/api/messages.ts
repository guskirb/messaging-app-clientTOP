import axios from "./axios";

export const getChatrooms = async () => {
  return axios
    .get("/chatrooms/all")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const createChatroom = async (data) => {
  return axios
    .post("/chatrooms/create", data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const addToChatroom = async (id, data) => {
  return axios
    .post(`/chatrooms/${id}/add-user`, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const leaveChatroom = async (id) => {
  return axios
    .post(`/chatrooms/${id}/leave`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const pinChatroom = async (id) => {
  return axios
    .post(`/chatrooms/${id}/pin`)
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

export const postImgMessage = async (id, data) => {
  return axios
    .post(`/chatrooms/${id}/messages/upload`, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};
