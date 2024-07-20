import useGetFriends from "../../hooks/useGetFriends";
import useAuth from "../../hooks/useAuth";
import "./profile.css";
import ProfileImgUpload from "./profile-img-upload";

export default function Profile({
  profile,
  loading,
  getUserProfile,
}: {
  profile: any;
  loading: boolean;
  getUserProfile: any;
}) {
  const { auth } = useAuth();
  const { users: friends } = useGetFriends();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile__container">
      <img className="profile-img" src={profile.user.image} alt="" />
      {profile.user._id === auth.user._id && (
        <ProfileImgUpload id={profile.user._id} getUserProfile={getUserProfile}/>
      )}
      <div className="profile-name">
        <h2>{profile.user.username}</h2>
        <div
          className={
            friends?.users?.some((user) => user._id === profile.user._id)
              ? "friend-icon"
              : ""
          }
        ></div>
        <div
          className={
            profile.user?.last_online_formatted !== "online"
              ? "offline-icon offline-profile"
              : "online-icon online-profile"
          }
        ></div>
      </div>
    </div>
  );
}
