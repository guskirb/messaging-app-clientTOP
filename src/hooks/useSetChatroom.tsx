import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getChatrooms } from "../api/messages";
import { Chatroom } from "../types/types";

export default function useSetChatroom() {
  const {
    data: chatrooms,
    isLoading: chatroomLoading,
    refetch: chatroomRefetch,
  } = useQuery({
    queryKey: ["chatrooms"],
    queryFn: getChatrooms,
  });
  const [chatroom, setChatroom] = useState<Chatroom | null>(null);

  async function setChat() {
    setChatroom(chatrooms.chatrooms[0]);
  }

  useEffect(() => {
    chatrooms?.chatrooms.length > 0 ? setChat() : setChatroom(null);
  }, [chatroomLoading]);

  return {
    chatrooms,
    chatroomLoading,
    chatroom,
    setChatroom,
    chatroomRefetch,
    setChat
  };
}
