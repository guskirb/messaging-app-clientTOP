import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import useChat from "../../hooks/useChat";

export default function Chat() {
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

  console.log(messages)

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <div>chat</div>;
}
