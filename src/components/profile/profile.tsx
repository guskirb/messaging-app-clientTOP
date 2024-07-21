import useGetFriends from "../../hooks/useGetFriends";
import useAuth from "../../hooks/useAuth";
import "./profile.css";
import ProfileImgUpload from "./profile-img-upload";
import { User } from "../../types/types";

type ProfileProps = {
  profile: {
    user: User;
  };
  loading: boolean;
  getUserProfile: any;
};

export default function Profile({
  profile,
  loading,
  getUserProfile,
}: ProfileProps) {
  const { auth } = useAuth();
  const { users: friends } = useGetFriends();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile__container">
      <img className="profile-img" src={profile.user.image} alt="" />
      {profile.user._id === auth?.user._id && (
        <ProfileImgUpload
          id={profile.user._id}
          getUserProfile={getUserProfile}
        />
      )}
      <div className="profile-name">
        <h2>{profile.user.username}</h2>
        <div
          className={
            friends?.users?.some((user: User) => user._id === profile.user._id)
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
      <div>
        <p>
          <b>Join Date: </b> {profile.user.join_date_formatted}
        </p>
      </div>
      {profile.user._id !== auth?.user._id && (
        <div>
          {friends?.users?.some(
            (user: User) => user._id === profile.user._id
          ) ? (
            <button>Remove Friend</button>
          ) : (
            <button>Add Friend</button>
          )}
          <button>Send Message</button>
        </div>
      )}
    </div>
  );
}
