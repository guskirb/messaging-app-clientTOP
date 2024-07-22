import { useContext } from "react";
import { ChatContext } from "../context/chat-provider";
import { ChatContextInterface } from "../context/chat-provider";

export default function useChat() {
  return useContext<ChatContextInterface>(ChatContext);
}
