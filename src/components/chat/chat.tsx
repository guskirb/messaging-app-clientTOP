import ListChat from "./list-chat";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import useChat from "../../hooks/useChat";
import { memo } from "react";
import { postMessage } from "../../api/messages";
import "./chat.css";

export default memo(function Chat() {
  const { chatroom } = useChat();
  const {
    data: messages,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [chatroom?._id],
    queryFn: () => getMessages(chatroom?._id),
    enabled: !!chatroom?._id,
  });
  console.log(chatroom)
  async function onSend(e) {
    e.preventDefault();
    let response = await postMessage(chatroom?._id, {
      message: e.target[0].value,
    });

    if (response?.success) {
      refetch();
      e.target[0].value = "";
    }
    console.log(response);
  }

  return (
    <div className="chat__container">
      <ListChat messages={messages} isLoading={isLoading} />
      <form action="" className="input__container" onSubmit={onSend}>
        <input type="text" name="message" placeholder="Enter Message..." />
        <button>enter</button>
      </form>
    </div>
  );
});
