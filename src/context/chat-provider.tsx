import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import useSetChatroom from "../hooks/useSetChatroom";
import { Chatroom } from "../types/types";

interface ChatContextInterface {
  chatrooms?: object;
  chatroomLoading?: boolean;
  chatroom?: Chatroom | null;
  setChatroom?: Dispatch<SetStateAction<Chatroom | null>>;
  refetch?: any;
}

export const ChatContext = createContext<ChatContextInterface>({});

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
