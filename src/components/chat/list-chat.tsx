import useAuth from "../../hooks/useAuth";

export default function ListChat({
  messages,
  isLoading,
  setSidebar,
  getUserProfile,
}) {
  const { auth } = useAuth();

  const listMessages = messages?.messages.map((message, index) => (
    <div
      key={message._id}
      className={message.user?._id === auth.user._id ? "user-me" : ""}
    >
      <p className="message-box">{message.message}</p>
      {messages?.messages[index + 1]?.user._id !== message?.user._id && (
        <div
          className="message-lower"
          onClick={() => {
            getUserProfile(message.user?._id);
            setSidebar("profile");
          }}
        >
          <img src={message.user.image} alt="" className="user-img" />
          <p>{message.user.username}</p>
        </div>
      )}
    </div>
  ));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <div className="message__container">{listMessages}</div>;
}
