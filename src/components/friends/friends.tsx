import ListUser from "../list-user/list-user";
import useGetFriends from "../../hooks/useGetFriends";
import Loader from "../loader/loader";
import React, { useEffect, useState } from "react";
import { User } from "../../types/types";

type FriendsProps = {
  setSidebar: any;
  getUserProfile: any;
};

export default function Friends({ setSidebar, getUserProfile }: FriendsProps) {
  const { users, isLoading } = useGetFriends();
  const [userList, setUserList] = useState({ users: [] });

  useEffect(() => {
    setUserList(users);
  }, [users]);

  function filterUsers(e: React.ChangeEvent<HTMLInputElement>) {
    setUserList({
      ...users,
      users: users.users.filter((user: User) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      ),
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="user-list__container">
      <h2>Friends</h2>
      <div className="search__container">
        <input
          className="messages-search"
          type="text"
          placeholder="Search Friends"
          onChange={filterUsers}
        />
      </div>
      {users.users.length !== 0 ? (
        <ListUser
          setSidebar={setSidebar}
          getUserProfile={getUserProfile}
          users={userList}
          isLoading={isLoading}
        />
      ) : (
        <button onClick={() => setSidebar("users")}>Find Friends</button>
      )}
    </div>
  );
}
