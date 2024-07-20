import "./sidebar.css";
import Profile from "../profile/profile";
import ChatroomList from "../chatroom-list/chatroom-list";
import Friends from "../friends/friends";
import Users from "../users/users";

export default function Sidebar({
  content,
  profile,
  setSidebar,
  getUserProfile,
  loading,
}: {
  content: string;
  profile: any;
  setSidebar: any;
  getUserProfile: any;
  loading: boolean;
}) {
  const renderSidebar = () => {
    switch (content) {
      case "profile":
        return (
          <Profile
            profile={profile}
            loading={loading}
            getUserProfile={getUserProfile}
          />
        );
      case "chatrooms":
        return <ChatroomList />;
      case "friends":
        return (
          <Friends setSidebar={setSidebar} getUserProfile={getUserProfile} />
        );
      case "users":
        return (
          <Users setSidebar={setSidebar} getUserProfile={getUserProfile} />
        );
    }
  };

  return <div className="sidebar__container">{renderSidebar()}</div>;
}
