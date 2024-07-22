import useAuth from "../../hooks/useAuth";
import ChatroomDropdown from "./chatroom-dropdown";
import { Chatroom } from "../../types/types";
import React from "react";
import "./chatroom-list.css";

type ChatroomBoxProps = {
  chat: Chatroom;
  chatroom: Chatroom;
  setChatroom: any;
  chatroomRefetch: any;
};

export default function ChatroomBox({
  chat,
  chatroom,
  setChatroom,
  chatroomRefetch,
}: ChatroomBoxProps) {
  const { auth } = useAuth();

  function onClickSetChatroom(e: React.MouseEvent) {
    if ((e.target as Element).className !== "more-button") {
      setChatroom(chat);
    }
  }

  return (
    <div
      className={
        chat?._id === chatroom?._id
          ? "chatroom__container active_chatroom"
          : "chatroom__container"
      }
      onClick={onClickSetChatroom}
    >
      {chat.users.length === 2 ? (
        <>
          <img
            className="chat-img"
            src={
              chat.users.filter((user) => {
                if (user._id !== auth?.user._id) {
                  return user;
                }
              })[0].image
            }
            alt=""
          />
          <div
            className={
              chat.users.filter((user) => {
                if (user._id !== auth?.user._id) {
                  return user;
                }
              })[0].last_online_formatted !== "online"
                ? "offline-icon offline-list"
                : "online-icon online-list"
            }
          ></div>
        </>
      ) : (
        <div className="group-chat-img"></div>
      )}

      <div>
        <div className="chatroom-name">
          <p>
            {chat?.name
              ? chat.name
              : chat?.users.length === 1
              ? "Empty Room"
              : chat.users
                  .filter((user) => {
                    if (user._id !== auth?.user._id) {
                      return user;
                    }
                  })
                  .slice(0, 3)
                  .map((user) => user.username)
                  .join(", ")}
          </p>
          <div className={chat.pinned ? "pin-icon icon" : ""}></div>
        </div>
        <div className="last-message__container">
          {chat.message_type === "img" && <div className="recent-img"></div>}
          <p>
            {chat.last_message ? (
              chat.last_message.length > 20 ? (
                chat.last_message.slice(0, 20) + "..."
              ) : (
                chat.last_message
              )
            ) : (
              <i>No messages...</i>
            )}
          </p>
        </div>
      </div>
      <ChatroomDropdown
        chatroomRefetch={chatroomRefetch}
        chat={chat}
        setChatroom={setChatroom}
      />
      <p className="chat-last-active">{chat.last_active_formatted}</p>
    </div>
  );
}
