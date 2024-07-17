import ListChat from "./list-chat";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import useChat from "../../hooks/useChat";
import { memo } from "react";
import { postMessage } from "../../api/messages";
import useSetChatroom from "../../hooks/useSetChatroom";
import useAuth from "../../hooks/useAuth";
import "./chat.css";

export default memo(function Chat({ setSidebar, getUserProfile }) {
  const { chatroom, chatroomLoading } = useChat();
  const { auth } = useAuth();
  const { refetch } = useSetChatroom();
  const {
    data: messages,
    isLoading,
    refetch: messageFetch,
  } = useQuery({
    queryKey: [chatroom?._id],
    queryFn: () => getMessages(chatroom?._id),
    enabled: !!chatroom?._id,
  });

  async function onSend(e) {
    e.preventDefault();
    let response = await postMessage(chatroom?._id, {
      message: e.target[0].value,
    });

    if (response?.success) {
      refetch();
      messageFetch();
      e.target[0].value = "";
    }
  }

  const setName = chatroom?.users
    ? chatroom?.name
      ? chatroom.name
      : chatroom.users.length === 1
      ? "Empty Room"
      : chatroom.users
          .filter((user) => {
            if (user._id !== auth.user._id) {
              return user;
            }
          })
          .slice(0, 3)
          .map((user) => user.username)
          .join(", ")
    : "Empty Room";

  if (isLoading || chatroomLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat__container">
      <div className="chat-upper__container">
        <img
          className="user-img"
          src={
            chatroom?.users?.length === 2
              ? chatroom.users.filter((user) => {
                  if (user._id !== auth.user._id) {
                    return user;
                  }
                })[0].image
              : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
          }
          alt=""
        />
        <h2>{setName}</h2>
        <button className="options-button">Options</button>
      </div>
      <ListChat
        messages={messages}
        isLoading={isLoading}
        setSidebar={setSidebar}
        getUserProfile={getUserProfile}
      />
      <form action="" className="input__container" onSubmit={onSend}>
        <input type="text" name="message" placeholder="Enter Message..." />
        <button>enter</button>
      </form>
    </div>
  );
});
