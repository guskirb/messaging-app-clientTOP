import { useEffect, useRef, useState } from "react";
import { pinChatroom, leaveChatroom } from "../../api/messages";
import { Chatroom } from "../../types/types";
import "./chatroom-list.css";

type ChatroomDropdownProps = {
  chatroomRefetch: any;
  chat: Chatroom;
  setChatroom: any;
};

export default function ChatroomDropdown({
  chatroomRefetch,
  chat,
  setChatroom,
}: ChatroomDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef<null | HTMLDivElement>(null);
  const dropdownRef = useRef<null | HTMLDivElement>(null);

  async function onClickPin(id: string) {
    setShowDropdown(false);
    await pinChatroom(id);
    chatroomRefetch();
  }

  async function onClickLeave(id: string) {
    setShowDropdown(false);
    await leaveChatroom(id);
    const response = await chatroomRefetch();
    
    if (response.data.chatrooms.length > 0) {
      setChatroom(response.data.chatrooms[0]);
    } else {
      setChatroom(null);
    }
  }

  function handleOutsideClick(e: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      e.target !== buttonRef.current
    ) {
      setShowDropdown(false);
    }
  }

  function stopPropagation(e: MouseEvent) {
    e.stopPropagation();
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className="more-button"
        onClick={() => setShowDropdown(true)}
        ref={buttonRef}
      ></div>
      {showDropdown && (
        <div
          className="dropdown__container"
          ref={dropdownRef}
          onClick={stopPropagation}
        >
          <ul>
            <li onClick={() => onClickPin(chat._id)}>
              {chat.pinned ? "Unpin" : "Pin"}
              <div
                className={chat.pinned ? "unpin-icon icon" : "pin-icon icon"}
              ></div>
            </li>
            <li onClick={() => onClickLeave(chat._id)}>
              Leave
              <div className="leave-icon icon"></div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
