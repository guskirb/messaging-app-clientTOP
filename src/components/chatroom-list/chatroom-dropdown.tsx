import { useEffect, useRef, useState } from "react";
import { pinChatroom, leaveChatroom } from "../../api/messages";
import "./chatroom-list.css";

export default function ChatroomDropdown({ refetch, chat }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  async function onClickPin(id) {
    setShowDropdown(false);
    await pinChatroom(id);
    refetch();
  }

  async function onClickLeave(id) {
    setShowDropdown(false);
    await leaveChatroom(id);
    refetch();
  }

  function handleOutsideClick(e) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      e.target !== buttonRef.current
    ) {
      setShowDropdown(false);
    }
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
        <div className="dropdown__container" ref={dropdownRef}>
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
