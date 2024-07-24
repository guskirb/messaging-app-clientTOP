import axios from "./axios";

type User = {
  user: string;
};

type Message = {
  message: string;
};

export const getChatrooms = async () => {
  return axios
    .get("/chatrooms/all")
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const createChatroom = async (data: User) => {
  return axios
    .post("/chatrooms/create", data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const addToChatroom = async (id: string, data: User) => {
  return axios
    .post(`/chatrooms/${id}/add-user`, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const leaveChatroom = async (id: string) => {
  return axios
    .post(`/chatrooms/${id}/leave`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const pinChatroom = async (id: string) => {
  return axios
    .post(`/chatrooms/${id}/pin`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const getMessages = async (id: string) => {
  return axios
    .get(`/chatrooms/${id}/messages`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const postMessage = async (id: string, data: Message) => {
  return axios
    .post(`/chatrooms/${id}/messages`, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const postImgMessage = async (id: string, data: any) => {
  return axios
    .post(`/chatrooms/${id}/messages/upload`, data)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const editChatroomName = async(id: string, data: any) => {
  return axios
  .post(`/chatrooms/${id}/name`, data)
  .then((response) => response.data)
  .catch((error) => error.response.data);
}
