import useGetFriends from "../../hooks/useGetFriends";
import useAuth from "../../hooks/useAuth";
import "./profile.css";
import ProfileImgUpload from "./profile-img-upload";
import { User } from "../../types/types";
import { useState } from "react";
import { removeFriend, addFriend } from "../../api/user";
import { createChatroom } from "../../api/messages";
import useChat from "../../hooks/useChat";

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
  const { setChatroom, chatroomRefetch } = useChat();
  let [currFriends, setCurrFriends] = useState(friends?.users);

  if (loading) {
    return <p>Loading...</p>;
  }

  async function onClickChat(id: string) {
    let response = await createChatroom({ user: id });
    if (response?.success) {
      chatroomRefetch();
      setChatroom(response.chatroom);
    }
  }

  async function onClickRemoveFriend(id: string) {
    setCurrFriends(
      currFriends.filter((item: User) => item._id !== profile.user._id)
    );
    await removeFriend(id);
  }

  async function onClickAddFriend(id: string) {
    setCurrFriends([...currFriends, profile.user]);
    await addFriend(id);
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
            currFriends?.some((user: User) => user._id === profile.user._id)
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
        <div className="button__wrapper">
          {currFriends?.some((user: User) => user._id === profile.user._id) ? (
            <button
              onClick={() => onClickRemoveFriend(profile.user._id)}
              className="remove-friend__button friend__button"
            ></button>
          ) : (
            <button
              onClick={() => onClickAddFriend(profile.user._id)}
              className="add-friend__button friend__button"
            ></button>
          )}
          <button onClick={() => onClickChat(profile.user._id)}>
            Send Message
          </button>
        </div>
      )}
    </div>
  );
}
