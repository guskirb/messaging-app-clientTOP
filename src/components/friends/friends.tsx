import ListUser from "../list-user/list-user";
import useGetFriends from "../../hooks/useGetFriends";

export default function Friends({ setSidebar, getUserProfile }) {
  const { users, isLoading } = useGetFriends();

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
