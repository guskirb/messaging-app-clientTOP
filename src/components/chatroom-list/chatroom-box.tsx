import useAuth from "../../hooks/useAuth";
import ChatroomDropdown from "./chatroom-dropdown";
import "./chatroom-list.css";

export default function ChatroomBox({ chat, setChatroom, refetch }) {
  const { auth } = useAuth();

  function onClickSetChatroom(e) {
    if (e.target.className !== "more-button") {
      setChatroom(chat);
    }
  }

  return (
    <div className="chatroom__container" onClick={onClickSetChatroom}>
      <img
        className="user-img"
        src={
          chat.users.length === 2
            ? chat.users.filter((user) => {
                if (user._id !== auth?.user._id) {
                  return user;
                }
              })[0].image
            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        }
        alt=""
      />
      <div>
        <div className="chatroom-name">
          <p>
            <b>
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
            </b>
          </p>
          <div className={chat.pinned ? "pin-icon icon" : ""}></div>
        </div>
        <div>
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
      <ChatroomDropdown refetch={refetch} chat={chat} />
      <p className="chat-last-active">{chat.last_active_formatted}</p>
    </div>
  );
}
