import "./list-user.css";

export default function ListUser({ setSidebar, getUserProfile, users }) {
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
            ? "offline-icon"
            : "online-icon"
        }
      ></div>
      <div>
        <p>
          <b>{user.username}</b>
        </p>
        <p className="user-last-online">{user.last_online_formatted}</p>
      </div>
    </div>
  ));

  return <>{listUsers}</>;
}
