import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/user";
import ListUser from "../list-user/list-user";

export default function Users({ setSidebar, getUserProfile }) {
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

  return (
    <div className="user-list__container">
      <h2>Users</h2>
      <ListUser
        setSidebar={setSidebar}
        getUserProfile={getUserProfile}
        users={users}
      />
    </div>
  );
}
