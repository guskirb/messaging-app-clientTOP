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
  console.log(users);
  const listUsers = users?.users.map((user) => (
    <div className="user__container">
      <img className="user-img" src={user.image} alt="" />
      <div>
        <p><b>{user.username}</b></p>
        <p>{user.last_online}</p>
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