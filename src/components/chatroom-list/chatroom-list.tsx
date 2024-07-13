import { useState } from "react";
import { createChatroom } from "../../api/messages";
import ChatroomModal from "./chatroom-modal";
import useChat from "../../hooks/useChat";
import "./chatroom-list.css";

export default function ChatroomList({}) {
  const { chatrooms, chatroomLoading, setChatroom, refetch } = useChat();
  const [showModal, setShowModal] = useState(false);

  function onClick() {
    // await createChatroom();
    // refetch();
    setShowModal(true);
  }

  if (chatroomLoading) {
    return <p>Loading...</p>;
  }

  // if (chatrooms.chatrooms.length === 0){
  //   return <p>No Chats</p>
  // }

  const listChatrooms = chatrooms?.chatrooms.map((chat) => (
    <div
      key={chat._id}
      className="chatroom__container"
      onClick={() => setChatroom(chat)}
    >
      {chat._id}
    </div>
  ));

  return (
    <div className="chatrooms__container">
      {showModal && (
        <ChatroomModal setShowModal={setShowModal} refetch={refetch} />
      )}
      <h2>Chats</h2>
      <div className="search__container">
        <input
          className="chatrooms-search"
          type="text"
          placeholder="Search Messages"
        />
      </div>
      <div className="recent-chatrooms">
        <h3>Recent</h3>
        <div onClick={onClick} className="add-chatroom-button"></div>
      </div>
      <div className="list-messages__container">{listChatrooms}</div>
    </div>
  );
}
