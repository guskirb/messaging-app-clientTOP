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
      <h2>{profile.user.username}</h2>
    </div>
  );
}
