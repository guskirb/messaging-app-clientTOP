import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/user";
import ListUser from "../list-user/list-user";
import Loader from "../loader/loader";

type UserProps = {
  setSidebar: any;
  getUserProfile: any;
};

export default function Users({ setSidebar, getUserProfile }: UserProps) {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

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
        />
      </div>
      <ListUser
        setSidebar={setSidebar}
        getUserProfile={getUserProfile}
        users={users}
        isLoading={isLoading}
      />
    </div>
  );
}
