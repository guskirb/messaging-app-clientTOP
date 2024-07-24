import Modal from "../modal/modal";
import useGetFriends from "../../hooks/useGetFriends";
import { Chatroom, User } from "../../types/types";
import { addToChatroom } from "../../api/messages";

type ChatModalProps = {
  setShowModal: any;
  chatroom: Chatroom;
  chatroomRefetch: any;
  setChatroom: any;
};

export default function ChatModal({
  setShowModal,
  chatroom,
  chatroomRefetch,
  setChatroom,
}: ChatModalProps) {
  const { users, isLoading } = useGetFriends();

  async function onClickAdd(id: string, data: string) {
    setShowModal(false);
    let response = await addToChatroom(id, { user: data });

    if (response.success) {
      chatroomRefetch();
      setChatroom(response.chatroom);
    }
  }

  const listUsers = users?.users
    .filter((user: User) => !chatroom.users.some((u) => u._id === user._id))
    .map((user: User) => (
      <div
        key={user._id}
        className={
          user.last_online_formatted !== "online"
            ? "user__container offline"
            : "user__container online"
        }
        onClick={() => onClickAdd(chatroom._id, user._id)}
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
    <Modal setShowModal={setShowModal} title={"Add User"}>
      {listUsers}
    </Modal>
  );
}
