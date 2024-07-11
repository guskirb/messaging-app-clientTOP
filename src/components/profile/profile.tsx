import "./profile.css";

export default function Profile({
  profile,
  loading,
}: {
  profile: any;
  loading: boolean;
}) {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile__container">
      <img className="profile-img" src={profile.user.image} alt="" />
      <div className="profile-name">
        <h2>{profile.user.username}</h2>
        <div
          className={
            profile.user.last_online_formatted !== "online"
              ? "offline-icon offline-profile"
              : "online-icon online-profile"
          }
        ></div>
      </div>
    </div>
  );
}
