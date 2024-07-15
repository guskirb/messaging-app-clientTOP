import { useEffect, useRef, useState } from "react";
import { addFriend, removeFriend } from "../../api/user";

export default function ListUserDropdown({ user, friends, refetch }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  async function onClickAdd(id) {
    setShowDropdown(false);
    await addFriend(id);
    refetch();
  }

  async function onClickRemove(id) {
    setShowDropdown(false);
    await removeFriend(id);
    refetch();
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  function onClickShow(e) {
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
                friends.users.some(e => e._id === user._id)
                  ? () => onClickRemove(user._id)
                  : () => onClickAdd(user._id)
              }
            >
              {friends.users.some(e => e._id === user._id)
                ? "Remove Friend"
                : "Add Friend"}
              <div
                className={
                  friends.users.some(e => e._id === user._id)
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
