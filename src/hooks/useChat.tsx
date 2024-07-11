import { useContext } from "react";
import { ChatContext } from "../context/chat-provider";

export default function useChat() {
  return useContext(ChatContext);
}
