import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../api/user";
import ListUser from "../list-user/list-user";

export default function Friends({ setSidebar, getUserProfile }) {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });
  console.log(users)
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-list__container">
      <h2>Friends</h2>
      <ListUser
        setSidebar={setSidebar}
        getUserProfile={getUserProfile}
        users={users}
      />
    </div>
  );
}
