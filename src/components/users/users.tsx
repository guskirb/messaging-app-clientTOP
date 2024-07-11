import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/user";
import "./users.css";

export default function Users() {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const listUsers = users?.users.map((user) => (
    <div
      key={user._id}
      className={
        user.last_online_formatted !== "online"
          ? "user__container offline"
          : "user__container online"
      }
    >
      <img className="user-img" src={user.image} alt="" />
      <div>
        <p>
          <b>{user.username}</b>
        </p>
        <p>{user.last_online_formatted}</p>
      </div>
    </div>
  ));

  return (
    <div className="user-list__container">
      <h2>Users</h2>
      {listUsers}
    </div>
  );
}
