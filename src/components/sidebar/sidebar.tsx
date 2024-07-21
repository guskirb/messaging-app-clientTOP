import "./sidebar.css";
import Profile from "../profile/profile";
import ChatroomList from "../chatroom-list/chatroom-list";
import Friends from "../friends/friends";
import Users from "../users/users";
import { User } from "../../types/types";

type SidebarProps = {
  content: string;
  profile: {
    user: User;
  };
  setSidebar: any;
  getUserProfile: any;
  loading: boolean;
  setShowModal: any;
  showModal: boolean;
};

export default function Sidebar({
  content,
  profile,
  setSidebar,
  getUserProfile,
  loading,
  setShowModal,
  showModal,
}: SidebarProps) {
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
        return (
          <ChatroomList setShowModal={setShowModal} showModal={showModal} />
        );
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
