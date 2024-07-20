import useGetFriends from "../../hooks/useGetFriends";
import { createChatroom, addToChatroom } from "../../api/messages";
import "./chatroom-list.css";

export default function ChatroomModal({
  setShowModal,
  chatroomRefetch,
  setChatroom,
  chatrooms,
}) {
  const { users, isLoading } = useGetFriends();

  function closeModal(e) {
    if (
      e.target.className !== "modal__background" &&
      e.target.className !== "modal__button"
    ) {
      return;
    }
    setShowModal(false);
  }

  async function makeChatroom(id) {
    setShowModal(false);
    let response = await createChatroom({ user: id });
    if (response?.success) {
      chatroomRefetch();
      console.log(response)
      setChatroom(response.chatroom);
    }
  }

  const listUsers = users?.users.map((user) => (
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
    <div className="modal__background" onClick={closeModal}>
      <div className="modal__container">
        <div className="modal__upper">
          <h2>New Chat</h2>
          <button className="modal__button" onClick={closeModal}>
            Close
          </button>
        </div>
        {listUsers}
      </div>
    </div>
  );
}
