import { useEffect, useRef, useState } from "react";
import { addFriend, removeFriend } from "../../api/user";
import { User } from "../../types/types";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

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

  function stopPropagation(e: MouseEvent) {
    e.stopPropagation();
  }

  function onClickShow(e: MouseEvent) {
    e.stopPropagation();
    setShowDropdown(true);
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
          </ul>
        </div>
      )}
    </>
  );
}
