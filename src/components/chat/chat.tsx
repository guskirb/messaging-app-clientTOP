import ListChat from "./list-chat";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import useChat from "../../hooks/useChat";
import { FormEvent, memo } from "react";
import { postMessage } from "../../api/messages";
import useAuth from "../../hooks/useAuth";
import "./chat.css";
import ImageUpload from "./image-upload";
import FindChat from "./find-chat";
import ChatDropdown from "./chat-dropdown";
import { User } from "../../types/types";
import Loader from "../loader/loader";

interface ChatProps {
  setSidebar: any;
  getUserProfile: any;
  setShowModal: any;
}

export default memo(function Chat({
  setSidebar,
  getUserProfile,
  setShowModal,
}: ChatProps) {
  const { chatroom, chatroomLoading, setChatroom, chatroomRefetch } = useChat();
  const { auth } = useAuth();
  const {
    data: messages,
    isLoading,
    refetch: messageFetch,
  } = useQuery({
    queryKey: [chatroom?._id],
    queryFn: () => getMessages(chatroom?._id!),
    enabled: !!chatroom?._id,
  });

  async function onSend(
    e: FormEvent<HTMLFormElement> & {
      target: any;
    }
  ) {
    e.preventDefault();
    let response = await postMessage(chatroom?._id!, {
      message: e.target[0].value,
    });

    if (response?.success) {
      chatroomRefetch();
      messageFetch();
      e.target[0].value = "";
    }
  }

  const setName = chatroom?.users
    ? chatroom?.name
      ? chatroom.name
      : chatroom?.users?.length === 1
      ? "Empty Room"
      : chatroom.users
          .filter((user: User) => {
            if (user._id !== auth?.user._id) {
              return user;
            }
          })
          .slice(0, 3)
          .map((user: User) => user.username)
          .join(", ")
    : "Empty Room";

  const userImgList = chatroom?.users.map((user) => (
    <img
      key={user._id}
      src={user.image}
      alt=""
      className="chatroom-user-img"
      onClick={() => {
        getUserProfile(user?._id);
        setSidebar("profile");
      }}
    />
  ));

  if (isLoading || chatroomLoading) {
    return <Loader />;
  }

  if (chatroom === null) {
    return <FindChat auth={auth!} setShowModal={setShowModal} />;
  }

  return (
    <div className="chat__container">
      <div className="chat-upper__container">
        {chatroom?.users?.length === 2 ? (
          <img
            className="chatroom-user-img"
            src={
              chatroom.users.filter((user) => {
                if (user._id !== auth?.user._id) {
                  return user;
                }
              })[0].image
            }
            alt=""
            onClick={() => {
              getUserProfile(
                chatroom.users.filter((user) => {
                  if (user._id !== auth?.user._id) {
                    return user;
                  }
                })[0]._id
              );
              setSidebar("profile");
            }}
          />
        ) : (
          <div className="group-chat-chatroom-img"></div>
        )}
        <div>
          <h2>{setName}</h2>
          <p className="users-amount">{chatroom?.users?.length} Members</p>
        </div>
        <div className="chatroom-user-img__container">{userImgList}</div>
        <div className="options__container">
          <ChatDropdown
            chatroom={chatroom!}
            setChatroom={setChatroom}
            chatroomRefetch={chatroomRefetch}
          />
        </div>
      </div>
      <ListChat
        messages={messages}
        isLoading={isLoading}
        setSidebar={setSidebar}
        getUserProfile={getUserProfile}
        chatroom={chatroom!}
      />
      <form action="" className="input__container" onSubmit={onSend}>
        <input type="text" name="message" placeholder="Enter Message..." />
        <ImageUpload
          chatroom={chatroom!}
          chatroomRefetch={chatroomRefetch}
          messageFetch={messageFetch}
        />
        <button className="send-button"></button>
      </form>
    </div>
  );
});
