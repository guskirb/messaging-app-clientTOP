import ListUser from "../list-user/list-user";
import useGetFriends from "../../hooks/useGetFriends";
import Loader from "../loader/loader";

type FriendsProps = {
  setSidebar: any;
  getUserProfile: any;
};

export default function Friends({ setSidebar, getUserProfile }: FriendsProps) {
  const { users, isLoading } = useGetFriends();

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
        />
      </div>
      {users.users.length !== 0 ? (
        <ListUser
          setSidebar={setSidebar}
          getUserProfile={getUserProfile}
          users={users}
          isLoading={isLoading}
        />
      ) : (
        <button onClick={() => setSidebar("users")}>Find Friends</button>
      )}
    </div>
  );
}
