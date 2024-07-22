import React, { useEffect, useRef, useState } from "react";
import { addFriend, removeFriend } from "../../api/user";
import { createChatroom } from "../../api/messages";
import { User } from "../../types/types";
import useChat from "../../hooks/useChat";

type ListUserDropdownProps = {
  user: User;
  friends: {
    users: Array<User>;
  };
  refetch: any;
};

export default function ListUserDropdown({
  user,
  friends,
  refetch,
}: ListUserDropdownProps) {
  const { setChatroom, chatroomRefetch } = useChat();
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  async function onClickChat(id: string) {
    setShowDropdown(false);
    let response = await createChatroom({ user: id });
    if (response?.success) {
      chatroomRefetch();
      setChatroom(response.chatroom);
    }
  }

  async function onClickAdd(id: string) {
    setShowDropdown(false);
    await addFriend(id);
    refetch();
  }

  async function onClickRemove(id: string) {
    setShowDropdown(false);
    await removeFriend(id);
    refetch();
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function onClickShow(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setShowDropdown(true);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="more-button" onClick={onClickShow} ref={buttonRef}></div>
      {showDropdown && (
        <div
          className="dropdown__container"
          ref={dropdownRef}
          onClick={stopPropagation}
        >
          <ul>
            <li
              onClick={
                friends.users.some((e) => e._id === user._id)
                  ? () => onClickRemove(user._id)
                  : () => onClickAdd(user._id)
              }
            >
              {friends.users.some((e) => e._id === user._id)
                ? "Remove Friend"
                : "Add Friend"}
              <div
                className={
                  friends.users.some((e) => e._id === user._id)
                    ? "remove-friend-icon icon"
                    : "add-friend-icon icon"
                }
              ></div>
            </li>
            <li onClick={() => onClickChat(user._id)}>Message</li>
          </ul>
        </div>
      )}
    </>
  );
}
