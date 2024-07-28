import ChatroomModal from "./chatroom-modal";
import ChatroomBox from "./chatroom-box";
import useChat from "../../hooks/useChat";
import "./chatroom-list.css";
import Loader from "../loader/loader";
import { useEffect, useState } from "react";
import { Chatroom } from "../../types/types";

type ChatroomListProps = {
  setShowModal: any;
  showModal: boolean;
};

export default function ChatroomList({
  setShowModal,
  showModal,
}: ChatroomListProps) {
  const { chatrooms, chatroomLoading, chatroom, setChatroom, chatroomRefetch } =
    useChat();
  const [chatroomList, setChatroomList] = useState({
    chatrooms: [] as Array<Chatroom>,
  });

  useEffect(() => {
    setChatroomList(chatrooms);
  }, [chatrooms]);

  function onClick() {
    setShowModal(true);
  }

  function filterChatroom(e: React.ChangeEvent<HTMLInputElement>) {
    setChatroomList({
      ...chatrooms,
      chatrooms: chatrooms.chatrooms.filter((chat: Chatroom) => {
        if (chat.name) {
          if (chat.name.toLowerCase().includes(e.target.value.toLowerCase())) {
            return true;
          }
        } else {
          if (
            chat.users.find((item) =>
              item.username.toLowerCase().includes(e.target.value.toLowerCase())
            )
          ) {
            return true;
          }
        }
      }),
    });
  }

  if (chatroomLoading) {
    return <Loader />;
  }

  const listChatrooms = chatroomList?.chatrooms
    .filter((item) => item.pinned === false)
    .map((chat) => (
      <ChatroomBox
        chat={chat}
        chatroom={chatroom!}
        setChatroom={setChatroom}
        chatroomRefetch={chatroomRefetch}
        key={chat._id}
      />
    ));

  const listPinnedChatrooms = chatroomList?.chatrooms
    .filter((item) => item.pinned === true)
    .map((chat) => (
      <ChatroomBox
        chat={chat}
        chatroom={chatroom!}
        setChatroom={setChatroom}
        chatroomRefetch={chatroomRefetch}
        key={chat._id}
      />
    ));

  return (
    <div className="chatrooms__container">
      {showModal && (
        <ChatroomModal
          setShowModal={setShowModal}
          chatroomRefetch={chatroomRefetch}
          setChatroom={setChatroom}
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
          onChange={filterChatroom}
        />
      </div>
      {chatrooms?.chatrooms.length === 0 ? (
        <button onClick={onClick}>Start a Chat</button>
      ) : (
        <>
          <div className="pinned-chatrooms">
            <h3>Pinned</h3>
          </div>
          <div className="list-messages__container">{listPinnedChatrooms}</div>
          <div className="recent-chatrooms">
            <h3>Recent</h3>
          </div>
          <div className="list-messages__container">{listChatrooms}</div>
        </>
      )}
    </div>
  );
}
