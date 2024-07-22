import useGetFriends from "../../hooks/useGetFriends";
import { createChatroom } from "../../api/messages";
import Modal from "../modal/modal";
import { User } from "../../types/types";
import "./chatroom-list.css";

type ChatroomModalProps = {
  setShowModal: any;
  chatroomRefetch: any;
  setChatroom: any;
};

export default function ChatroomModal({
  setShowModal,
  chatroomRefetch,
  setChatroom,
}: ChatroomModalProps) {
  const { users, isLoading } = useGetFriends();

  async function makeChatroom(id: string) {
    setShowModal(false);
    let response = await createChatroom({ user: id });
    if (response?.success) {
      chatroomRefetch();
      setChatroom(response.chatroom);
    }
  }

  const listUsers = users?.users.map((user: User) => (
    <div
      key={user._id}
      className={
        user.last_online_formatted !== "online"
          ? "user__container offline"
          : "user__container online"
      }
      onClick={() => makeChatroom(user._id)}
    >
      <img className="user-img" src={user.image} alt="" />
      <div
        className={
          user.last_online_formatted !== "online"
            ? "offline-icon offline-list"
            : "online-icon online-list"
        }
      ></div>
      <div>
        <p>
          <b>{user.username}</b>
        </p>
        <p className="user-last-online">{user.last_online_formatted}</p>
      </div>
    </div>
  ));

  return (
    <Modal setShowModal={setShowModal} title={"New Chat"}>
      {listUsers}
    </Modal>
  );
}
