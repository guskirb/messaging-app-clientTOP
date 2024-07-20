import useAuth from "../../hooks/useAuth";
import { useRef, useEffect, Fragment } from "react";
import { Chatroom, Message } from "../../types/types";

type Props = {
  messages: {
    messages: Array<Message>;
  };
  isLoading: boolean;
  setSidebar: any;
  getUserProfile: any;
  chatroom: Chatroom;
};

export default function ListChat({
  messages,
  isLoading,
  setSidebar,
  getUserProfile,
  chatroom,
}: Props) {
  const { auth } = useAuth();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatroom]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="message__container">
      {messages?.messages.map((message, index) => (
        <Fragment key={message._id}>
          {messages?.messages[index - 1]?.date_formatted.date !==
            message?.date_formatted.date && (
            <div className="message-date__container">
              <div className="line"></div>
              <p className="message-date">{message.date_formatted.date}</p>
              <div className="line"></div>
            </div>
          )}
          <div
            className={message.user?._id === auth?.user._id ? "user-me" : ""}
          >
            <div className="message-box">
              {message.message && <p>{message.message}</p>}
              {message.image && (
                <img src={message.image} alt="" className="message-img" />
              )}
              <p className="message-time">{message.date_formatted.time}</p>
            </div>
            {messages?.messages[index + 1]?.user._id !== message?.user._id ||
            messages?.messages[index + 1]?.date_formatted.date !==
              message?.date_formatted.date ? (
              <div className="message-lower">
                <img
                  src={message.user.image}
                  alt=""
                  className="user-img"
                  onClick={() => {
                    getUserProfile(message.user?._id);
                    setSidebar("profile");
                  }}
                />
                <p
                  onClick={() => {
                    getUserProfile(message.user?._id);
                    setSidebar("profile");
                  }}
                >
                  {message.user.username}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Fragment>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}
