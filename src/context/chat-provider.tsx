import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import useSetChatroom from "../hooks/useSetChatroom";
import { Chatroom } from "../types/types";

export interface ChatContextInterface {
  chatrooms: {
    chatrooms: Array<Chatroom>;
  };
  chatroomLoading: boolean;
  chatroom: Chatroom | null;
  setChatroom: Dispatch<SetStateAction<Chatroom | null>>;
  chatroomRefetch: any;
}

export const ChatContext = createContext<ChatContextInterface | any>(null);

interface Props {
  children?: ReactNode;
}

export function ChatProvider({ children }: Props) {
  const { chatrooms, chatroomLoading, chatroom, setChatroom, chatroomRefetch } =
    useSetChatroom();

  return (
    <ChatContext.Provider
      value={{
        chatrooms,
        chatroomLoading,
        chatroom,
        setChatroom,
        chatroomRefetch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
