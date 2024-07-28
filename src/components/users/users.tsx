import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/user";
import ListUser from "../list-user/list-user";
import Loader from "../loader/loader";
import React, { useState, useEffect } from "react";
import { User } from "../../types/types";

type UserProps = {
  setSidebar: any;
  getUserProfile: any;
};

export default function Users({ setSidebar, getUserProfile }: UserProps) {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
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
      <h2>Users</h2>
      <div className="search__container">
        <input
          className="messages-search"
          type="text"
          placeholder="Search Users"
          onChange={filterUsers}
        />
      </div>
      <ListUser
        setSidebar={setSidebar}
        getUserProfile={getUserProfile}
        users={userList}
        isLoading={isLoading}
      />
    </div>
  );
}
