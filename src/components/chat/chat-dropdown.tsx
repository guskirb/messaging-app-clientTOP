import React, { useRef, useState, useEffect } from "react";
import { leaveChatroom } from "../../api/messages";
import { Chatroom } from "../../types/types";

type ChatDropdownProps = {
  chatroom: Chatroom;
  setChatroom: any;
  chatroomRefetch: any;
};

export default function ChatDropdown({
  chatroom,
  setChatroom,
  chatroomRefetch,
}: ChatDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef<null | HTMLDivElement>(null);
  const dropdownRef = useRef<null | HTMLDivElement>(null);

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

  function handleOutsideClick({ target }: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(target as Node) &&
      target !== buttonRef.current
    ) {
      setShowDropdown(false);
    }
  }

  function stopPropagation(e: React.MouseEvent) {
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
        className="options-button"
        onClick={() => setShowDropdown(!showDropdown)}
        ref={buttonRef}
      ></div>
      {showDropdown && (
        <div
          className="options-dropdown__container"
          ref={dropdownRef}
          onClick={stopPropagation}
        >
          <ul>
            <li>Rename Chat</li>
            <li>Add User</li>
            <li onClick={() => onClickLeave(chatroom._id)}>
              Leave<div className="leave-icon icon"></div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
