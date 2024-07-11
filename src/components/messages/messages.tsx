import { useQuery } from "@tanstack/react-query";
import { getChatrooms, createChatroom } from "../../api/messages";
import "./messages.css";

export default function Messages() {
  const {
    data: chatrooms,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["chatrooms"],
    queryFn: getChatrooms,
  });

  function onClick() {
    createChatroom();
    refetch();
  }
  console.log(chatrooms);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // if (chatrooms.chatrooms.length === 0){
  //   return <p>No Chats</p>
  // }

  return (
    <div className="messages__container">
      <h2>Chats</h2>
      <div>
        <input
          className="messages-search"
          type="text"
          placeholder="Search messages"
        />
      </div>
      <div>
        <h3>Recent</h3>
        <div onClick={onClick} className="add-message-button"></div>
      </div>
    </div>
  );
}
