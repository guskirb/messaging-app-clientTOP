import { ReactNode, createContext, useState } from "react";
import useSetChatroom from "../hooks/useSetChatroom";

export const ChatContext = createContext({});

interface Props {
  children?: ReactNode;
}

export function ChatProvider({ children }: Props) {
  const { chatrooms, chatroomLoading, chatroom, setChatroom, refetch } =
    useSetChatroom();

  return (
    <ChatContext.Provider
      value={{ chatrooms, chatroomLoading, chatroom, setChatroom, refetch }}
    >
      {children}
    </ChatContext.Provider>
  );
}
