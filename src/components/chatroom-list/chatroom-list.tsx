import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ChatroomModal from "./chatroom-modal";
import ChatroomBox from "./chatroom-box";
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

  const listChatrooms = chatrooms?.chatrooms
    .filter((item) => item.pinned === false)
    .map((chat) => (
      <ChatroomBox
        chat={chat}
        setChatroom={setChatroom}
        refetch={refetch}
        key={chat._id}
      />
    ));

  const listPinnedChatrooms = chatrooms?.chatrooms
    .filter((item) => item.pinned === true)
    .map((chat) => (
      <ChatroomBox
        chat={chat}
        setChatroom={setChatroom}
        refetch={refetch}
        key={chat._id}
      />
    ));

  return (
    <div className="chatrooms__container">
      {showModal && (
        <ChatroomModal
          setShowModal={setShowModal}
          refetch={refetch}
          setChatroom={setChatroom}
          chatrooms={chatrooms}
        />
      )}

      <div className="chatrooms__upper">
        <h2>Chats</h2>
        <div onClick={onClick} className="add-chatroom-button"></div>
      </div>
      <div className="search__container">
        <input
          className="chatrooms-search"
          type="text"
          placeholder="Search Messages"
        />
      </div>
      <div className="pinned-chatrooms">
        <h3>Pinned</h3>
      </div>
      <div className="list-messages__container">{listPinnedChatrooms}</div>
      <div className="recent-chatrooms">
        <h3>Recent</h3>
      </div>
      <div className="list-messages__container">{listChatrooms}</div>
    </div>
  );
}
