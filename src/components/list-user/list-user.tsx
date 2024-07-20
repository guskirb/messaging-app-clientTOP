import ListUserDropdown from "./list-user-dropdown";
import useAuth from "../../hooks/useAuth";
import useGetFriends from "../../hooks/useGetFriends";
import "./list-user.css";
import { User } from "../../types/types";

type ListUserProps = {
  setSidebar: any;
  getUserProfile: any;
  users: {
    users: Array<User>;
  };
  isLoading: boolean;
};

export default function ListUser({
  setSidebar,
  getUserProfile,
  users,
  isLoading,
}: ListUserProps) {
  const { auth } = useAuth();
  const { users: friends, refetch } = useGetFriends();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const listUsers = users?.users.map((user) => (
    <div
      key={user._id}
      className={
        user.last_online_formatted !== "online"
          ? "user__container offline"
          : "user__container online"
      }
      onClick={() => {
        getUserProfile(user.id);
        setSidebar("profile");
      }}
    >
      <img className="user-img" src={user.image} alt="" />
      <div
        className={
          user.last_online_formatted !== "online"
            ? "offline-icon offline-list"
            : "online-icon online-list"
        }
      ></div>
      <div>
        <div className="user-name">
          <p>
            <b>{user.username}</b>
          </p>
          <div
            className={
              friends?.users?.some((user: User) => user._id === user._id)
                ? "friend-icon"
                : ""
            }
          ></div>
        </div>
        <p className="user-last-online">{user.last_online_formatted}</p>
      </div>
      {user._id !== auth?.user._id && (
        <ListUserDropdown user={user} friends={friends} refetch={refetch} />
      )}
    </div>
  ));

  return <div className="list__container">{listUsers}</div>;
}
