import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getChatrooms } from "../api/messages";
import { Chatroom } from "../types/types";

export default function useSetChatroom() {
  const {
    data: chatrooms,
    isLoading: chatroomLoading,
    refetch,
  } = useQuery({
    queryKey: ["chatrooms"],
    queryFn: getChatrooms,
  });
  const [chatroom, setChatroom] = useState<Chatroom | null>(null);

  useEffect(() => {
    setChatroom(chatrooms?.chatrooms[0]);
  }, []);

  return {
    chatrooms,
    chatroomLoading,
    chatroom,
    setChatroom,
    refetch,
  };
}
