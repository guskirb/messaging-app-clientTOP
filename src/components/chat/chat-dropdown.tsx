import { useRef, useState, useEffect } from "react";
import { leaveChatroom } from "../../api/messages";

export default function ChatDropdown({
  chatroom,
  setChatroom,
  chatroomRefetch,
}) {
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
            <li>Add user</li>
            <li onClick={() => onClickLeave(chatroom._id)}>
              Leave<div className="leave-icon icon"></div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
