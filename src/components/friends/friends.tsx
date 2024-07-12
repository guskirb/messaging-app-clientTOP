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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-list__container">
      <h2>Friends</h2>
      <div className="search__container">
        <input
          className="messages-search"
          type="text"
          placeholder="Search Friends"
        />
      </div>
      <ListUser
        setSidebar={setSidebar}
        getUserProfile={getUserProfile}
        users={users}
      />
    </div>
  );
}
